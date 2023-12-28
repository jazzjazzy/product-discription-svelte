import { p as prisma } from "../../../../../chunks/prisma.js";
import { j as json } from "../../../../../chunks/index.js";
const POST = async () => {
  const user = await prisma.user.findMany();
  console.log(user);
  return json({
    status: 200,
    body: {
      message: user.length,
      user
    }
  });
};
export {
  POST
};
