import type { RequestHandler } from './$types'
import prisma from '$lib/server/prisma'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async () => {

    const pricing = await prisma.pricing.findMany();

    console.log(pricing);

    return json({
        status: 200,
        body: {
            message: pricing.length,
            user: pricing
        }
    });
}
