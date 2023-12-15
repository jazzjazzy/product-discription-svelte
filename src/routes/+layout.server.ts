import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {

        const session = await locals.auth.validate();
        console.log("HEADER SESSION", session);
        if (!session){
            return {
                userId: null,
            }
        }
        return {
            userId: session.user.userId as string,
            name: session.user.name as string,
            email: session.user.email as string,
        };


}) satisfies LayoutServerLoad;