import prisma from "$lib/server/prisma";

export async function getUserlogin(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
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
    console.log('firstDayOfMonth', firstDayOfMonth);

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

export async function isPlanLimitReached(userId: string , plan: string) {
    console.log('userId', userId);
    let totalRecordsThisMonth = await countMonthlyDescriptions(userId);
    console.log('totalRecordsThisMonth', totalRecordsThisMonth);
    let monthlyLimit = false;
    
    //TODO: add amount of description to the pricing table so we are not hard coding it

    //check if user has reached the monthly limit
    if (!plan && totalRecordsThisMonth >= 3) {
        monthlyLimit = true;
        console.log('monthlyLimit', 3);
    } else if (plan === 'Nano' && totalRecordsThisMonth >= 10) {
        monthlyLimit = true;
        console.log('monthlyLimit', 3);
    } else if (plan === 'Pro' && totalRecordsThisMonth >= 50) {
        monthlyLimit = true;
        console.log('monthlyLimit', 3);
    }
    //ultra plan has no limit
    return monthlyLimit;

}