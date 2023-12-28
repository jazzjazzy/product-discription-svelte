import { p as prisma } from "../../../../../chunks/prisma.js";
const load = async ({ params }) => {
  const { id } = params;
  const price = await prisma.pricing.findUnique({ where: { id } });
  return { price };
};
const actions = {
  create: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log("formData", formData);
    const newUser = await prisma.pricing.create({
      data: {
        name: formData.name,
        // Replace with the new first name
        price: parseFloat(formData.price),
        // Replace with the new surname
        description: formData.description,
        // Replace with the new email
        list: formData.list,
        // Replace with the new role
        stripe_price_id: formData.stripe_price_id,
        // Replace with the new Stripe customer ID
        visable: formData.visable,
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
    const updatedUser = await prisma.pricing.update({
      where: {
        id: formData.id
        // Replace with the user's ID
      },
      data: {
        name: formData.name,
        // Replace with the new first name
        price: parseFloat(formData.price),
        // Replace with the new surname
        description: formData.description,
        // Replace with the new email
        list: formData.list,
        // Replace with the new role
        stripe_price_id: formData.stripe_price_id,
        // Replace with the new Stripe customer ID
        visable: formData.visable,
        // Replace with the new subscription ID
        created_at: /* @__PURE__ */ new Date()
        // Optionally update the updated_at field
        // Add any other fields you want to update
      }
    });
    console.log(updatedUser);
  },
  delete: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    await prisma.pricing.delete({
      where: {
        id: formData.id
      }
    });
  }
};
export {
  actions,
  load
};
