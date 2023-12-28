import { s as stripe } from "../../../../../../chunks/stripe.js";
import { r as redirect } from "../../../../../../chunks/index.js";
import { p as prisma } from "../../../../../../chunks/prisma.js";
async function load({ url, locals }) {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/login");
  }
  session.user.userId;
  const id = url.searchParams.get("payment_intent");
  console.log(id);
  if (id === null) {
    return { message: "Success! Subscription has been updated." };
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(id);
  let message;
  switch (paymentIntent.status) {
    case "succeeded":
      message = "Success! Payment received.";
      await prisma.subscription.update({
        where: {
          stripe_customer_id: paymentIntent.customer
        },
        data: {
          stripe_status: "active"
        }
      });
      break;
    case "processing":
      message = "Payment processing. We'll update you when payment is received.";
      break;
    case "requires_payment_method":
      throw redirect(303, "/checkout/payment");
    default:
      message = "Something went wrong.";
      break;
  }
  return { message };
}
export {
  load
};
