import { auth } from "$lib/server/lucia";
import { error, redirect, fail } from "@sveltejs/kit";
import { generatePasswordResetToken } from "$lib/server/token";
import { sendPasswordResetLink, isValidEmail, sendOAuthNotice } from "$lib/server/email";
import prisma from "$lib/server/prisma";
import { json } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email");

		if (!email) {
			return fail(400, { email, message: "please add an email address" });
		}
		if (!email || !isValidEmail(email)) {
			return fail(400, { email, message: "Email Address is not valid, please add valid email" });
		}


		try {
			const storedUser = await prisma.user.findUnique({
				where: {
					email: email.toLowerCase()
				},
				include: {
					key: true
				}
			});
			
			if (!storedUser) {
				return json({ status: 400, message: "No user found with this email" });
			}

			if (storedUser.key[0].id){
				let type = storedUser.key[0].id.split(":")[0];
				if (type !== "email") {
					await sendOAuthNotice(email, type);
					return {
						status: 200
					};
				}
			}

			const user = auth.transformDatabaseUser(storedUser);
			const token = await generatePasswordResetToken(user.userId);

			await sendPasswordResetLink(token, email);
			return {
				status: 200
			};
		} catch (e) {
			return json({ status: 500, message: "An unknown error occurred" });
		}
	}
};