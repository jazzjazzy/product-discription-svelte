import type { PageServerLoad } from './$types';
import { stripe } from '$lib/server/stripe'
import { redirect } from '@sveltejs/kit'

export const load = (async (request) => {
  const priceId = request.query.get('priceid');


  return {};
}) satisfies PageServerLoad;


export const actions = {
  // default form action
  default: async ({ request, cookies }) => {
    // get the form
    const form = await request.formData()

    // create the customer
    const customer = await stripe.customers.create({
      email: form.get('email'),
      name: form.get('name')
    })

    console.log(customer)

    // set a cookie
    cookies.set('customerId', customer.id)

    // redirect to collect payment
    throw redirect(303, '/checkout/payment')
  }
}