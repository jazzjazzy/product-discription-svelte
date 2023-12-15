import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Insert Categories
        const categories = await prisma.pricing.createMany({
            data: [
                {
                    name: 'Nano',
                    price: 10,
                    description: 'Nano description',
                    list:'["5 discription per month"]',
                    stripe_price_id: 'price_1OLzXoHOzYU2TTIbihGTlELa',
                    visable: true,
                },
                {
                    name: 'Pro',
                    price: 60,
                    description: 'Pro description',
                    list:'["50 discription per month"]',
                    stripe_price_id: 'price_1OM1yjHOzYU2TTIbQvRaAObC',
                    visable: true,
                },
                {
                    name: 'Ultra',
                    price: 180,
                    description: 'Ultra description',
                    list:'["unlimited discription per month"]',
                    stripe_price_id: 'price_1OM1zMHOzYU2TTIbf612EefY',
                    visable: true,
                },
            ],
        });

        console.log("Seed data inserted successfully!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();