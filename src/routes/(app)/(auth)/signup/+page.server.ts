import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from "zod";
import { auth } from '$lib/server/lucia';
import { generateEmailVerificationToken } from "$lib/server/token";
import { sendEmailVerificationLink } from "$lib/server/email";


export const load = (async ({locals}) => {
    const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, "/email-verification");
		throw redirect(302, "/");
	}
	return {};
}) 


const schema = z.object({
    firstname: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(64, { message: 'First name must be at most 64 characters long' }),
    surname: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters long' })
        .max(64, { message: 'First name must be at most 64 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match Password Confirm',
            path: ['password']
        });
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords Confirm do not match Password',
            path: ['confirmPassword']
        })
    };

    // Check for at least one uppercase letter, one special character, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9\s_]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasSpecialChar || !hasNumber) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password must contain at least :  <br />- one uppercase letter <br />- one special character<br />- one number',
            path: ['password']
        });
    }

    if (password === confirmPassword) {
        return true;
    }
})


export const actions = {
    default: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());// line 41

        try {

            const result: z = schema.parse(formData);

            const user = await auth.createUser({
                key: {
                    providerId: 'email',
                    providerUserId: result.email,
                    password: result.password,
                },
                attributes: {
                    email_verified: false,
                    email: result.email,
                    firstname: result.firstname,
                    surname: result.surname,
                }
            });

            const session = await auth.createSession({
                userId: user.userId,
                attributes: {
                    name: `${result.firstname} ${result.surname}`,
                    role: 'USER',
                    subscribed: false,
                    plan: undefined
                },
            });
            locals.auth.setSession(session); // set the session in the auth request

            const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(token, result.email);

        } catch (err: any) {
            console.log("exception:: ", err);
            const { fieldErrors: errors } = err.flatten();
            const { password, passwordConfirm, ...rest } = formData;
            return {
                data: rest,
                errors,
            }

        }
        throw redirect(302, '/dashboard');

    }
}