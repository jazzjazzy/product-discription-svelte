// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { zfd } from "zod-form-data";
import { auth } from '$lib/server/lucia';
import prisma from '$lib/server/prisma';

export const actions = {
    signin: async ({ locals, request }: import('./$types').RequestEvent) => {

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

            var { name, role, subscribed, plan } = await getUserlogin(key.userId);

            const session = await auth.createSession({
                userId: key.userId,
                attributes: {
                    name: name,
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

        if (role && role === 'ADMIN' || role === 'GOD') {
            throw redirect(302, '/admin');
        }

        throw redirect(302, '/dashboard');

    },
    signout: async ({ locals }: import('./$types').RequestEvent) => {
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
    let name = `${user?.firstname} ${user?.surname}`;
    let role = user?.role;
    let subscribed = (!user?.subscription[0] ? false : true);
    let plan = user?.subscription[0]?.Pricing?.name;
    return { name, role, subscribed, plan };
};null as any as Actions;