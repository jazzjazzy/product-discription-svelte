import { p as prisma } from "../../../../../chunks/prisma.js";
import { s as stringToBoolean } from "../../../../../chunks/Utilis.js";
const load = async ({ params }) => {
  const { id } = params;
  const session = await prisma.session.findUnique({ where: { id } });
  return { session };
};
const actions = {
  create: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log("formData", formData);
    const newUser = await prisma.session.create({
      data: {
        user_id: formData.user_id,
        // Replace with the new first name
        active_expires: formData.active_expires,
        // Replace with the new surname
        idle_expires: formData.idle_expires,
        // Replace with the new email
        name: formData.name,
        // Replace with the new role
        role: formData.role,
        // Replace with the new Stripe customer ID
        subscribed: stringToBoolean(formData.subscribed),
        // Replace with the new subscription ID
        plan: formData.plan
        // Optionally update the updated_at field
        // Add any other fields you want to update
      }
    });
    console.log(newUser);
  },
  update: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log("formData", formData);
    const updatedUser = await prisma.session.update({
      where: {
        id: formData.id
        // Replace with the user's ID
      },
      data: {
        user_id: formData.user_id,
        // Replace with the new first name
        active_expires: formData.active_expires,
        // Replace with the new surname
        idle_expires: formData.idle_expires,
        // Replace with the new email
        name: formData.name,
        // Replace with the new role
        role: formData.role,
        // Replace with the new Stripe customer ID
        subscribed: stringToBoolean(formData.subscribed),
        // Replace with the new subscription ID
        plan: formData.plan
        // Optionally update the updated_at field
        // Add any other fields you want to update
      }
    });
    console.log(updatedUser);
  },
  delete: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    await prisma.session.delete({
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
