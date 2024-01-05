import { stripe } from '$lib/server/stripe';
import { DOMAIN } from '$env/static/private';
import prisma from '$lib/server/prisma';
import type { User as PrismaUser } from '$lib/types/user';
import type { Subscription } from '$lib/types/subscription';
import { redirect, error } from '@sveltejs/kit';

/**
 * Handles the load process for the subscription page.
 * @param url The URL of the request.
 * @param locals The locals provided by SvelteKit.
 * @returns The client secret and return URL for the subscription process.
 * @throws Error if the subscription process encounters issues.
 */
export async function load({ url, locals }): Promise<{ clientSecret: string; returnUrl: string }> {
  const subtype = url.searchParams.get('subtype');
  const isupdate = url.searchParams.get('update');


  if (!subtype) {
    throw error(400, 'No subscription type specified');
  }

  const pricing = await getSubscriptionType(subtype);
  if (!pricing) {
    throw error(400, 'Invalid subscription type');
  }

  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, '/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.userId },
    include: {
      subscription: {
        include: {
          Pricing: true
        },

      }
    }
  });


  if (!user) {
    throw error(500, 'User not found, subscription could not be created');
  }
  //console.log("v", user);
  // if the user has an active subscription and is not updating their subscription redirect to pricing page
  if (user?.subscription.length > 0 && (user?.subscription[0].stripe_status == 'active' || user?.subscription[0].stripe_status == 'trialing') && isupdate === null) {
    throw redirect(302, '/pricing');
  }

  let subscription = null;

  if (isupdate !== null) {

    subscription = await changeSubscription(user.subscription[0], isupdate);

  } else {

    let clientSecret = await addSubscription(user, subtype, pricing);

    return {
      clientSecret: clientSecret,
      returnUrl: new URL('/checkout/complete', DOMAIN).toString(),
    };
  }


  /**
   * Retrieves the pricing details for a given subscription type.
   * @param subtype The subscription type.
   * @returns The pricing details.
   */
  async function getSubscriptionType(subtype: string) {
    return prisma.pricing.findFirst({
      where: { name: subtype },
    });
  }

  /**
   * update or change a subscription
   * 
   * @param userSubscription 
   * @param isupdate 
   */

  async function changeSubscription(userSubscription: Subscription, isupdate: string) {
    let subscription = await stripe.subscriptions.retrieve(userSubscription.stripe_subscription_id);

    const newPricing = await getSubscriptionType(isupdate);

    if (subscription.status !== 'active' && subscription.status !== 'trialing') {
      throw error(500, 'Subscription not found, subscription could not be updated')
    }

    let subupdate = await stripe.subscriptions.update(
      subscription.id,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: newPricing?.stripe_price_id,
          }
        ],
        // Add other changes here (e.g., `quantity`, `metadata`)
      }
    ).then(updatedSubscription => {
      // Handle the updated subscription
      return updatedSubscription;
    }).catch(error => {
      // Handle any errors
      console.error("error::", error);
    });

    if (newPricing) {
      await prisma.subscription.update({
        where: {
          stripe_customer_id: userSubscription.stripe_customer_id,
        },
        data: {
          stripe_status: subupdate.status,
          stripe_price_id: subupdate.plan.id,
          type: isupdate.toLowerCase(),
        }
      });
      throw redirect(302, '/checkout/complete');
    }
  }


  /**
   * add a new subscription
   * 
   * @param user 
   * @param subtype 
   * @param pricing 
   */

  async function addSubscription(user: PrismaUser, subtype: string, pricing: Pricing) {
    let customerId = null;

    console.log("pricing", pricing);

    if (!!user.stripe_customer_id) {
      customerId = user.stripe_customer_id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.firstname + ' ' + user.surname,
      });
      customerId = customer.id;
    }

    //todo: fix this so we can use this subscription trial_period_days or just straight subscription based on a flag or setting jan 5 2024 jason

    subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: pricing.stripe_price_id }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 14, // need to remove this it you don't want trial period
    });

    let clientSecret = null;
    // todo: this is messy and needs to be fixed jan 5 2024 jason

    // need to have a client secret to use in the Elements form which can be found in a payment_intent 
    // But if we have a trial period we don't get one, so if there is no payment_intent create a setupIntent
    // and then get the client secret from that
    if (!subscription.latest_invoice?.payment_intent) {
      const setupIntent = await stripe.setupIntents.create({
        payment_method_types: ['card'],
        customer: customerId,
      });

      clientSecret = setupIntent.client_secret
    }else{
      clientSecret = subscription.latest_invoice.payment_intent.client_secret
    }

    //if wwe have a subscription that is incomplete update it
    if (user.subscription.length > 0 && user.subscription[0].stripe_status === 'incomplete') {
      await prisma.subscription.update({
        data: {
          stripe_subscription_id: subscription.id,
          type: subtype,
          stripe_status: subscription.status,
          stripe_price_id: pricing.stripe_price_id,
          price_id: pricing.id,
        },
        where: { id: user.subscription[0].id }
      });
    } else {
      //add a subscription to the user
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripe_customer_id: customerId,
          subscription: {
            create: {
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              type: subtype,
              stripe_status: subscription.status,
              stripe_price_id: pricing.stripe_price_id,
              price_id: pricing.id,
            },
          },
        },
      });
    }
    return  clientSecret ;
  }
}
