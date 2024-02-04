import { auth } from "$lib/server/lucia";
import { validateEmailVerificationToken } from "$lib/server/token";
import { getUserlogin, addSessionDetailsToLocals } from "$lib/helpers/user";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, locals }) => {
	const { token } = params;
	try {
		const userId = await validateEmailVerificationToken(token);

		const user = await auth.getUser(userId);

		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true // `Number(true)` if stored as an integer
		});
		const { name, role, subscribed, plan } = await getUserlogin(user.userId);

		await addSessionDetailsToLocals(user.userId, name, role, subscribed, plan, locals);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		console.error(e);
		return new Response("Invalid email verification link", {
			status: 400
		});
	}
};