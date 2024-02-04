import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { zfd } from "zod-form-data";
import { auth } from '$lib/server/lucia';
import { getUserlogin, addSessionDetailsToLocals } from '$lib/helpers/user';


export const load = (async ({ cookies, locals }) => {
    //if we have session and email is not verified redirect to email verification page
    const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, "/email-verification");
		throw redirect(302, "/");
	}
	
    //when google login for first time for a user that is already registered with that email
    //we get an error message from google login
    const errorMessage = cookies.get('login_error');
    //if we have an error message from google login
    if (errorMessage !== '') {
        cookies.set('login_error', '', { path: '/' });
        return {error: errorMessage}
    }

    return {};
})


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

            var { name, role, subscribed, plan } = await getUserlogin(key.userId);

            await addSessionDetailsToLocals(key.userId, name, role, subscribed, plan, locals);
           

        } catch (e: any) {
            return fail(400, { message: e.message + " = " + e.code })
        }

        if (role && role === 'ADMIN' || role === 'GOD') {
            throw redirect(302, '/admin');
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