import type { PageServerLoad } from './$types';
import type { Pricing } from '$lib/types/subscription';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();

    let currSubscription = null;

    if (!!session) {
        // get the current login subscription name
        // must be uppercase first letter
        currSubscription = (session.plan) ? session.plan[0].toUpperCase() + session.plan.slice(1) : null;
    }

    const prices: Pricing[] = await getPricingData();

    if (prices) {
        return { prices, currSubscription };
    }

    return { status: 404, message: 'not found' };
}) satisfies PageServerLoad;


// get all pricing data
async function getPricingData(): Promise<Pricing[]> {
    return await prisma.pricing.findMany({ orderBy: { price: `asc` } });
}