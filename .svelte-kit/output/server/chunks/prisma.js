import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  try {
    const allUsers = await prisma.user.findMany({ select: { id: true }, where: { role: "ADMIN" } });
  } catch (error) {
    console.error("Error connecting to Prisma:", error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
export {
  prisma as p
};
