import { p as prisma } from "../../../../../chunks/prisma.js";
const load = async ({ params }) => {
  const { id } = params;
  const user = await prisma.user.findUnique({ where: { id } });
  return { user };
};
const actions = {
  create: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log("formData", formData);
    const newUser = await prisma.user.create({
      data: {
        firstname: formData.firstname,
        // Replace with the new first name
        surname: formData.surname,
        // Replace with the new surname
        email: formData.email,
        // Replace with the new email
        role: formData.role,
        // Replace with the new role
        stripe_customer_id: formData.stripe_customer_id,
        // Replace with the new Stripe customer ID
        subscription_id: formData.subscription_id,
        // Replace with the new subscription ID
        created_at: /* @__PURE__ */ new Date()
        // Optionally update the updated_at field
        // Add any other fields you want to update
      }
    });
    console.log(newUser);
  },
  update: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log("formData", formData);
    const updatedUser = await prisma.user.update({
      where: {
        id: formData.id
        // Replace with the user's ID
      },
      data: {
        firstname: formData.firstname,
        // Replace with the new first name
        surname: formData.surname,
        // Replace with the new surname
        email: formData.email,
        // Replace with the new email
        role: formData.role,
        // Replace with the new role
        stripe_customer_id: formData.stripe_customer_id,
        // Replace with the new Stripe customer ID
        subscription_id: formData.subscription_id,
        // Replace with the new subscription ID
        updated_at: /* @__PURE__ */ new Date()
        // Optionally update the updated_at field
        // Add any other fields you want to update
      }
    });
    console.log(updatedUser);
  },
  delete: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    await prisma.user.delete({
      where: {
        id: formData.id
      }
    });
    throw redirect("/admin");
  }
};
export {
  actions,
  load
};
