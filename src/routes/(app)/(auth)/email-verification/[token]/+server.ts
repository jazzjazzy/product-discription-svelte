import { auth } from "$lib/server/lucia";
import { validateEmailVerificationToken } from "$lib/server/token";
import { getUserlogin } from "$lib/helpers/user";
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