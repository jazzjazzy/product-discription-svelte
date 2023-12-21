import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { zfd } from "zod-form-data";
import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma';

export const actions: Actions = {
    signin: async ({ locals, request }) => {

        const data = await request.formData();

        const schema = zfd.formData({
            email: zfd.text(),
            password: zfd.text(),
        });

        const result = await schema.safeParseAsync(data);



        if (!result.success) {
            return fail(400, { message: "Invalid form data", errors: result.error.errors })
        }
        try {
            const key = await auth.useKey('email', result.data.email, result.data.password)

            let { role, subscribed, plan } = await getUserlogin(key.userId);

            const session = await auth.createSession({
                userId: key.userId,
                attributes: {
                    role: role,
                    subscribed: subscribed,
                    plan: plan

                },
            });
            locals.auth.setSession(session); // set the session in the auth request
        } catch (e: any) {
            console.log('e', e);
            return fail(400, { message: e.message + " = " + e.code })
        }

        throw redirect(302, '/dashboard');
    },
    signout: async ({ locals }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/login');
        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);
        throw redirect(302, '/login');
    }
}

async function getUserlogin(userId: string) {
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
    let role = user?.role;
    let subscribed = (!user?.subscription[0] ? false : true);
    let plan = user?.subscription[0]?.Pricing?.name;
    return { role, subscribed, plan };
}