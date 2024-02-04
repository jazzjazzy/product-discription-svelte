import { stripe } from '$lib/server/stripe'
import { redirect } from '@sveltejs/kit'
import prisma from '$lib/server/prisma'

export async function load({ url, locals }) {
  const change = url.searchParams.get('change');
  const session = await locals.auth.validate()

  if (!session) {
    throw redirect(302, '/login')
  }
  const userId = session.user.userId
  // pull payment intent id from the URL query string
  const id = url.searchParams.get('payment_intent')

  //TODO: not to sure about this thought it would only be shown if the user is updating their subscription
  // but seem to be shown on first purchase as well, need to check it out jason:3/2/2024
  if (id === null) {
    return {
      message: `<span class="font-semibold">Great news!</span> Your subscription has been successfully updated. Rest assured, your new
   plan will be applied to your next billing cycle. We're thrilled to continue serving you with
    our top-notch selections.`, change: change
    }
  }

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

  switch (paymentIntent.status) {
    case 'succeeded':
      message = `<span class="font-semibold">Great news!</span> Your subscription has been successfully updated. Rest assured, your new
       plan will be applied to your next billing cycle. We're thrilled to continue serving you with
        our top-notch selections.`

      await prisma.subscription.update({
        where: {
          stripe_customer_id: paymentIntent.customer,
        },
        data: {
          stripe_status: 'active'
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