import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        // Insert Categories
        const categories = await prisma.pricing.createMany({
            data: [
                {
                    name: 'FREE',
                    price: 0,
                    description: `The FREE account is meticulously crafted for newcomers who are exploring options and seeking to determine if this product aligns well with their business needs. It's an ideal choice for anyone who is just taking a preliminary glance.`,
                    limit: 3,
                    list: `[]`,
                    stripe_price_id: '',
                    visable: true,
                },
                {
                    name: 'Nano',
                    price: 10,
                    description: `The Nano account is expertly designed for individuals or businesses who find themselves updating their products only a few times each month. This account type is ideal for those who require a no-frills, straightforward service without the need for extensive daily updates.`,
                    limit: 20,
                    list: `[
                        "Basic to creative style writing", 
                        "Small medium and large text length"
                        ]`,
                    stripe_price_id: 'price_1ONkrkHOzYU2TTIbKBzYvMPu',
                    visable: true,
                },
                {
                    name: 'Pro',
                    price: 60,
                    description: `The Pro account is the ultimate solution for businesses and power users who require frequent updates and a comprehensive set of features. It's ideal for those who actively manage a large product catalog or constantly evolve their service offerings.`,
                    limit: 180,
                    list: `[
                        "Basic to creative style writing", 
                        "Small medium and large text length",
                        "A history of all your descriptions",
                        "Generated long tail keywords"
                        ]`,
                    stripe_price_id: 'price_1ONkrLHOzYU2TTIbRKXPpHLm',
                    visable: true,
                },
                {
                    name: 'Ultra',
                    price: 180,
                    description: `The Ultra account is our most powerful offering, designed for those who demand the utmost in terms of capabilities and flexibility. It's the perfect solution for large enterprises, high-traffic e-commerce sites, and businesses that require the highest level of performance and unlimited resources.`,
                    limit: 0,
                    list: `[
                        "Basic to creative style writing", 
                        "Small medium and large text length",
                        "A history of all your descriptions",
                        "Generated long tail keywords"
                        ]`,
                    stripe_price_id: 'price_1ONkqrHOzYU2TTIbJsgW4hcu',
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