// routes/login/google/callback/+server.ts
import { auth, googleAuth } from "$lib/server/lucia"
import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get("google_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	console.log("storedState", storedState);
	console.log("state", state);
	console.log("code", code);
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code);

		console.log("googleUser", googleUser);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					firstname: googleUser.login
				}
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
		console.log("e", e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {

			status: 500
		});
	}
};