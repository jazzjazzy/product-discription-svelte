import type { PageServerLoad } from './$types';
import { stripe } from '$lib/server/stripe';
import { DOMAIN } from '$env/static/private';
import prisma from '$lib/server/prisma';
import type { User } from '$lib/types/user';
import { redirect, error } from '@sveltejs/kit';
import { updated } from '$app/stores';

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
        where: {
          stripe_status: 'succeeded'
        }
      },
    }
  });


  if (!user) {
    throw error(500, 'User not found, subscription could not be created');
  }

  if (user?.stripe_customer_id !== null && isupdate === null) {
    throw redirect(302, '/pricing');
  }

  if (isupdate !== null) {
    console.log("subscription", user)
    const subscription = await stripe.subscriptions.retrieve(user.subscription[0].stripe_subscription_id);
    const newPricing = await getSubscriptionType(isupdate);

    if (subscription.status !== 'active') {
      throw error(500, 'Subscription not found, subscription could not be updated')
    }

    stripe.subscriptions.update(
      'subscription_id',
      {
        items: [{
          id: subscription.items.data[0].id,
          price: newPricing, // ID of the new price
        }],
        // Add other changes here (e.g., `quantity`, `metadata`)
      }
    );

    if (newPricing) {
      await prisma.subscription.update({
        where: {
          stripe_customer_id: user.subscription[0].stripe_customer_id,
        },
        data: {
          stripe_status: subscription.status,
          stripe_price_id: newPricing.stripe_price_id,
        }
      });
    }

  }


  const customer = await stripe.customers.create({
    email: user.email,
    name: user.firstname + ' ' + user.surname,
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: pricing.stripe_price_id }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripe_customer_id: customer.id,
      subscription: {
        create: {
          stripe_customer_id: customer.id,
          stripe_subscription_id: subscription.id,
          type: subtype,
          stripe_status: subscription.status,
          stripe_price_id: pricing.stripe_price_id,
          price_id: pricing.id,
        },
      },
    },
  });

  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    returnUrl: new URL('/checkout/complete', DOMAIN).toString(),
  };
}
