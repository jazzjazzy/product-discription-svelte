import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import { validatePasswordResetToken } from "$lib/server/token";
import { getUserlogin } from "$lib/helpers/user";
import { z, ZodError } from "zod";

import type { Actions } from "./$types";

const schema = z.object({
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




export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const formData = Object.fromEntries(await request.formData());// line 41

		try {

			const result: z = await schema.parse(formData);


			const { token } = params;
			const userId = await validatePasswordResetToken(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword("email", user.email, result.password);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true
				});
			}

			const { name, role, subscribed, plan } = await getUserlogin(user.userId);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {
					name,
					role,
					subscribed,
					plan,
				}
			});
			locals.auth.setSession(session);

			throw redirect(302, "/");
		} catch (err) {
			// Check if the error is a ZodError
			if (err instanceof ZodError) {
				const formattedErrors = err.issues.reduce((acc, issue) => {
					acc[issue.path[0]] = issue.message;
					return acc;
				}, {});

				return {
					status: 400, // Bad Request
					errors: formattedErrors
				};
			}

			console.error("Unexpected error:", err);
			// Handle other errors or throw internal server error
			return {
				status: 500,
				errors: { message: "Internal Server Error" }
			};
		}

	}
};