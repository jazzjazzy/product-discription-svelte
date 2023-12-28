import { s as stripe } from "../../../../../../chunks/stripe.js";
import { D as DOMAIN } from "../../../../../../chunks/private.js";
import { p as prisma } from "../../../../../../chunks/prisma.js";
import { e as error, r as redirect } from "../../../../../../chunks/index.js";
async function load({ url, locals }) {
  const subtype = url.searchParams.get("subtype");
  const isupdate = url.searchParams.get("update");
  if (!subtype) {
    throw error(400, "No subscription type specified");
  }
  const pricing = await getSubscriptionType(subtype);
  if (!pricing) {
    throw error(400, "Invalid subscription type");
  }
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/login");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.userId },
    include: {
      subscription: {
        include: {
          Pricing: true
        }
      }
    }
  });
  if (!user) {
    throw error(500, "User not found, subscription could not be created");
  }
  if (user?.subscription.length > 0 && user?.subscription[0].stripe_status == "active" && isupdate === null) {
    throw redirect(302, "/pricing");
  }
  let subscription = null;
  if (isupdate !== null) {
    subscription = await changeSubscription(user.subscription[0], isupdate);
  } else {
    subscription = await addSubscription(user, subtype, pricing);
    console.log("subscription", subscription);
    return {
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      returnUrl: new URL("/checkout/complete", DOMAIN).toString()
    };
  }
  async function getSubscriptionType(subtype2) {
    return prisma.pricing.findFirst({
      where: { name: subtype2 }
    });
  }
  async function changeSubscription(userSubscription, isupdate2) {
    let subscription2 = await stripe.subscriptions.retrieve(userSubscription.stripe_subscription_id);
    const newPricing = await getSubscriptionType(isupdate2);
    if (subscription2.status !== "active") {
      throw error(500, "Subscription not found, subscription could not be updated");
    }
    let subupdate = await stripe.subscriptions.update(
      subscription2.id,
      {
        items: [
          {
            id: subscription2.items.data[0].id,
            price: newPricing?.stripe_price_id
          }
        ]
        // Add other changes here (e.g., `quantity`, `metadata`)
      }
    ).then((updatedSubscription) => {
      return updatedSubscription;
    }).catch((error2) => {
      console.error("error::", error2);
    });
    if (newPricing) {
      await prisma.subscription.update({
        where: {
          stripe_customer_id: userSubscription.stripe_customer_id
        },
        data: {
          stripe_status: subupdate.status,
          stripe_price_id: subupdate.plan.id,
          type: isupdate2.toLowerCase()
        }
      });
      throw redirect(302, "/checkout/complete");
    }
  }
  async function addSubscription(user2, subtype2, pricing2) {
    let customerId = null;
    if (!!user2.stripe_customer_id) {
      customerId = user2.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user2.email,
        name: user2.firstname + " " + user2.surname
      });
      customerId = customer.id;
    }
    subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: pricing2.stripe_price_id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"]
    });
    if (user2.subscription.length > 0 && user2.subscription[0].stripe_status === "incomplete") {
      await prisma.subscription.update({
        data: {
          stripe_subscription_id: subscription.id,
          type: subtype2,
          stripe_status: subscription.status,
          stripe_price_id: pricing2.stripe_price_id,
          price_id: pricing2.id
        },
        where: { id: user2.subscription[0].id }
      });
    } else {
      await prisma.user.update({
        where: { id: user2.id },
        data: {
          stripe_customer_id: customerId,
          subscription: {
            create: {
              stripe_customer_id: customerId,
              stripe_subscription_id: subscription.id,
              type: subtype2,
              stripe_status: subscription.status,
              stripe_price_id: pricing2.stripe_price_id,
              price_id: pricing2.id
            }
          }
        }
      });
    }
    return subscription;
  }
}
export {
  load
};
