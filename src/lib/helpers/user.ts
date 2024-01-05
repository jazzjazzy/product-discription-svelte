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
    if(!token){
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