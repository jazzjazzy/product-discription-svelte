import { p as prisma } from "../../../../../chunks/prisma.js";
import { c as convertBigIntToDate } from "../../../../../chunks/Utilis.js";
const POST = async () => {
  const user = await prisma.session.findMany();
  const serializedData = convertBigIntToDate({
    status: 200,
    body: {
      message: user.length,
      user
    }
  });
  return new Response(serializedData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export {
  POST
};
