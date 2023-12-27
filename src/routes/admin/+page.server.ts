import type { PageServerLoad } from './dashboard/$types';
import prisma from '$lib/server/prisma';

const now = new Date(Date.now())
const nowTimestamp = BigInt(now.getTime());

export const load = (async ({ locals }) => {

    let session = await locals.auth.validate();

    const online = await prisma.session.count({
        where: {
            active_expires: {
                gte: nowTimestamp
            }
        }
    });

    const usersToday = await prisma.user.count({
        where: {
            created_at: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            AND : {
                role : {
                    not: 'ADMIN'
                },
                OR: {
                    role : {
                        not: 'GOD'
                    }
                }
            },
        }
    });

    const usersSevenDays = await prisma.user.count({
        where: {
            created_at: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            },
            AND : {
                role : {
                    not: 'ADMIN'
                },
                OR: {
                    role : {
                        not: 'GOD'
                    }
                }
            },
        }
    });

    const historySevenDays = await prisma.descriptionHistory.count({
        where: {
            created_at: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        }
    });


    return { online, usersSevenDays, usersToday, historySevenDays };
}) satisfies PageServerLoad;