import { s as stripe } from "../../../../../chunks/stripe.js";
import { r as redirect } from "../../../../../chunks/index.js";
const load = async (request) => {
  request.query.get("priceid");
  return {};
};
const actions = {
  // default form action
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const customer = await stripe.customers.create({
      email: form.get("email"),
      name: form.get("name")
    });
    console.log(customer);
    cookies.set("customerId", customer.id);
    throw redirect(303, "/checkout/payment");
  }
};
export {
  actions,
  load
};
