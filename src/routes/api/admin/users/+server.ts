import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async () => {

    const user = await prisma.user.findMany();

    console.log(user);

    return json({
        status: 200,
        body: {
            message: user.length,
            user: user
        }
    });
}
