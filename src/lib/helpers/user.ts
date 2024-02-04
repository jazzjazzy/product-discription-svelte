import prisma from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";
import type { Key } from "lucia";


export async function getUserlogin(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId, deleted_at: null },
        include: {
            subscription: {
                include: {
                    Pricing: true
                }
            },
        }
    });
    let name = `${user?.firstname} ${user?.surname}`;
    let role = user?.role;
    let subscribed = (!user?.subscription[0] ? false : true);
    let plan = user?.subscription[0]?.Pricing?.name;
    return { name, role, subscribed, plan };
}

/**
 * this will take a seesion key and check if it is valid
 * 
 * this is mainly used for the api routes to check if the user is logged in
 * 
 * @param token 
 * @returns 
 */
export async function validateBySessionId(token: string) {
    if (!token) {
        return null;
    }

    return await prisma.session.findUnique({
        where: {
            id: token,
            active_expires: {
                gt: BigInt(Date.now())  // This compares active_expires to the current time
            }
        },
        select: {
            user_id: true,
            plan: true,
            role: true,
        }
    })
}


/**
 * This will count the number of descriptions for the current month
 * 
 * @param userId 
 * @returns 
 */
export async function countMonthlyDescriptions(userId: string) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    return await prisma.descriptionHistory.count({
        where: {
            user_id: userId,
            created_at: {
                gte: firstDayOfMonth
            }
        }
    });
}

/**
 * This will check if the user has reached the monthly limit
 * 
 * @param userId 
 * @param plan 
 * @returns 
 */

export async function isPlanLimitReached(userId: string, plan: string) {

    // ultra plan has no limit so return false 
    if (plan === 'Ultra') { return false }
    // if no plan is set then set to free
    if (!plan) { plan = 'Free' }

    let totalRecordsThisMonth = await countMonthlyDescriptions(userId);

    let monthlyLimit = false;

    const pricing = await prisma.pricing.findFirst({ where: { name: plan }, select: { limit: true } });

    if (!pricing) {
        throw new Error('No pricing plan found - can\'t determine limit');
    }

    if (totalRecordsThisMonth >= pricing.limit) { monthlyLimit = true }

    return monthlyLimit;
}

/**
 * Will addes the session details to the locals object 
 * 
 * @param userId 
 * @param name 
 * @param role 
 * @param subscribed 
 * @param plan 
 * @param locals 
 */
export async function addSessionDetailsToLocals(userId:string, name: string, role:string|undefined, subscribed:boolean, plan:string|undefined, locals: App.Locals ){
    
    let upperPlan = (plan) ? `${plan.charAt(0).toUpperCase()}${plan.slice(1)}`: undefined;
    
    const session = await auth.createSession({
        userId: userId,
        attributes: {
            name,
            role,
            subscribed,
            plan: upperPlan
        },
    });

    locals.auth.setSession(session); 
}