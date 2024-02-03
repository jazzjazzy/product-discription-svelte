import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { z } from "zod";
import { auth } from '$lib/server/lucia';
import { generateEmailVerificationToken } from "$lib/server/token";
import { sendEmailVerificationLink } from "$lib/server/email";


export const load = (async ({ locals }) => {
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

        // Initialize a ZodError instance for potential custom errors
        let customError = new z.ZodError([]);

        try {

            const result: z = schema.parse(formData);

            console.log("result:: ", result.email);

            const existingUserExists = !!(await prisma.user.findFirst({
                where: { email: result.email },
            }));

            if (existingUserExists) {
                // Add a custom Zod issue for the email field
                customError.addIssue({
                    code: 'custom',
                    path: ['email'], // Specify the path to the email field
                    message: 'Email already in use. please try another email', // Custom error message
                });

                // Throw the custom ZodError
                throw customError;
            }


            console.log("existingUserExists:: ", existingUserExists);

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
            let verificationSent = await sendEmailVerificationLink(token, result.email);

            if (!verificationSent || verificationSent.error !== null) {
                await auth.deleteUser(user.userId); // delete 
                throw verificationSent.message;
            }

        } catch (err: any) {
            console.log("exception:: ", err);
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                const { password, passwordConfirm, ...rest } = formData;
                return {
                    data: rest,
                    errors,
                }
            } else {
                return {
                    err,
                }
            }
        }
        throw redirect(302, '/dashboard');

    }
}