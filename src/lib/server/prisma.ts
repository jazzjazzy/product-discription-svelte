import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default prisma;

async function main() {
    //checking if we can connect to the database
    try {
      const allUsers = await prisma.user.findMany({select: {id: true}, where: {role: "ADMIN"}});
    } catch (error) {
      console.error('Error connecting to Prisma:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();