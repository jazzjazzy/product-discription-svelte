import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { zfd } from "zod-form-data";
import { auth } from '$lib/server/lucia';


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
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {},
            });
            locals.auth.setSession(session); // set the session in the auth request
        } catch (e: any ) {
            return fail(400, {message: e.message + " = " + e.code })
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