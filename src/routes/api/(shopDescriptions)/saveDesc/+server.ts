import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit'
import type { validSession } from '$lib/types/user';
import { validateBySessionId } from '$lib/helpers/user'
import prisma from '$lib/server/prisma';

export const PUT: RequestHandler = async ({ request }) => {
    const { token, title, description } = await request.json();

    let activeSession: validSession = await validateBySessionId(token);
    console.log("Checking object before create call:", activeSession);
    if (activeSession === null) {
        return json({
            status: 409,
            body: {
                message: 'No valid page was found',
            }
        });
    }

    let savedDesc = null;

    if (activeSession.user_id !== null && (activeSession.plan !== null || activeSession.plan !== 'NANO')) {

        savedDesc = await prisma.shop_description.createMany({
            data: {
                user_id: activeSession.user_id,
                title,
                description,
            }
        });
    } else {
        return json({
            status: 401,
            body: {
                message: 'No valid user was found',
            }
        });
    }

    return json({
        status: 200,
        body: {
            savedDesc
        }
    });
};