import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default prisma;

async function main() {
    try {
      const allUsers = await prisma.user.findMany();
      console.log(allUsers);
    } catch (error) {
      console.error('Error connecting to Prisma:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  main();