import { p as prisma } from "../../../../../chunks/prisma.js";
import "../../../../../chunks/lucia.js";
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  let currSubscription = null;
  if (!!session) {
    currSubscription = session.plan;
  }
  const prices = await getPricingData();
  if (prices) {
    return { prices, currSubscription };
  }
  return { status: 404, message: "not found" };
};
async function getPricingData() {
  return await prisma.pricing.findMany({ orderBy: { price: `asc` } });
}
export {
  load
};
