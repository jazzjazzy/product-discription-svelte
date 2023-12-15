import { stripe } from '$lib/server/stripe'
import { redirect } from '@sveltejs/kit'
import prisma from '$lib/server/prisma'

export async function load({ url, locals }) {

  const session = await locals.auth.validate()

  if (!session) {
    throw redirect(302, '/login')
  }
  const userId = session.user.userId
  // pull payment intent id from the URL query string
  const id = url.searchParams.get('payment_intent')

  // ask Stripe for latest info about this paymentIntent
  const paymentIntent = await stripe.paymentIntents.retrieve(id)

  /* Inspect the PaymentIntent `status` to indicate the status of the payment
   * to your customer.
   *
   * Some payment methods will [immediately succeed or fail][0] upon
   * confirmation, while others will first enter a `processing` state.
   *
   * [0] https://stripe.com/docs/payments/payment-methods#payment-notification
   */
  let message
  //console.log('invoiceIntent', invoiceIntent);

  /*console.log('User', user);
console.log('customer', customer);
console.log('subscription', subscription);

await prisma.user.update({
  where: { id: user.id },
  data: {
    stripe_customer_id: customer.id,
    subscription: {
      create: {
        id: user.id,
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        type: subtype,
        stripe_status: subscription.status,
        stripe_price_id: pricing.stripe_price_id,
      },
    },
  },
});
*/
  switch (paymentIntent.status) {
    case 'succeeded':
      message = 'Success! Payment received.'

        await prisma.subscription.update({
          where: {
            stripe_customer_id: paymentIntent.customer,
          },
          data: {
            stripe_status: paymentIntent.status
          }
        });
      
      // TODO: provision account here

      break

    case 'processing':
      message = "Payment processing. We'll update you when payment is received."
      break

    case 'requires_payment_method':
      // Redirect user back to payment page to re-attempt payment
      throw redirect(303, '/checkout/payment')

    default:
      message = 'Something went wrong.'
      break
  }

  return { message }
}