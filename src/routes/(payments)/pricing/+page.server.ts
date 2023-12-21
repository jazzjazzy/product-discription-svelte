import type { PageServerLoad } from './$types';
import type { Pricing } from '$lib/types/subscription';
import prisma from '$lib/server/prisma';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    console.log('session', session);

    let currSubscription = null;

    if (!!session) {
        // get the current login subscription name
        currSubscription = session.plan;
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