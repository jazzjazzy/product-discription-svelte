import { p as prisma } from "../../../../../chunks/prisma.js";
import { j as json } from "../../../../../chunks/index.js";
const POST = async () => {
  const pricing = await prisma.pricing.findMany();
  console.log(pricing);
  return json({
    status: 200,
    body: {
      message: pricing.length,
      user: pricing
    }
  });
};
export {
  POST
};
