import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma'
import { json } from '@sveltejs/kit'
import type { validSession } from '$lib/types/user';
import { validateBySessionId } from '$lib/helpers/user'

export const POST: RequestHandler = async ({request}) => {
    const { token } = await request.json();

    let activeSession: validSession = await validateBySessionId(token);

    if (activeSession === null) {
        return json({
            status: 409,
            body: {
                message: 'No valid page was found',
            }
        });
    }

    let user = null;

    //if the user is not an admin or god then they can only see their own history
    if (activeSession.user_id !== null && (activeSession.plan !== null || activeSession.plan !== 'NANO')) {
        user = await prisma.shop_description.findMany({
            where: {
                user_id: activeSession.user_id,
            },
            orderBy: { created_at: 'desc' }
        });
    }else{
        return json({
            status: 409,
            body: {
                message: 'No valid page was found',
            }
        });
    }

    return json({
        status: 200,
        body: {
            message: user.length,
            user: user
        }
    });
};