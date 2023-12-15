import type { PageServerLoad } from './$types';
import type { Pricing } from '$lib/types/subscription';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    let currSubscription = null;

    if (!!session) {
        let user = await prisma.user.findUnique({
            where: { id: session.user.userId },
            include: {
                subscription: {
                    include: {
                        Pricing: true
                    }
                },
            }
        });

        if (user?.subscription[0]) {
            currSubscription = user?.subscription[0]?.Pricing?.name;
        }
    }

    const prices: Pricing[] = await getPricingData();

    if (prices) {
        return { prices, currSubscription };
    }

    return { status: 404, message: 'not found' };
}) satisfies PageServerLoad;


// get all pricing data
async function getPricingData(): Promise<Pricing[]> {
    return await prisma.pricing.findMany();
}