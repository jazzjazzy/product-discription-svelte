import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {

    const session = await locals.auth.validate();
    //console.log("HEADER SESSION", session);
    if (!session) {
        return {
            userId: null,
        }
    }
    return {
        userId: session.user.userId as string,
        name: session.name as string,
        email: session.email as string,
        role: session.role as string,
    };


}) satisfies LayoutServerLoad;