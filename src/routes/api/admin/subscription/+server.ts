import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma'
import { convertBigIntToDate } from '$lib/server/Utilis';


export const POST: RequestHandler = async () => {

    const user = await prisma.subscription.findMany({ include: { User: true, Pricing:true } });

    console.log('user', user);

    const serializedData = convertBigIntToDate({
        status: 200,
        body: {
            message: user.length,
            user: user
        }
    });

    // Use serialized data in the response
    return new Response(serializedData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

