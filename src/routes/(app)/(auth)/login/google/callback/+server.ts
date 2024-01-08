// routes/login/google/callback/+server.ts
import { auth, googleAuth } from "$lib/server/lucia"
import { OAuthRequestError } from "@lucia-auth/oauth";
import { getUserlogin } from "$lib/helpers/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { error, redirect } from "@sveltejs/kit";

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get("google_oauth_state");
	const state = url.searchParams.get("state");
	const code = url.searchParams.get("code");

	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, googleUser, createUser } =
			await googleAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					firstname: googleUser.given_name,
					surname: googleUser.family_name,
					email: googleUser.email!,
					role: "USER",
					email_verified: true, // google oauth is are concided verified on signup
				}
			});
			return user;
		};

		const user = await getUser();
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
		if (e instanceof OAuthRequestError) {
			throw error(401, "Unauthorized - could not connect to Google oAuth with current one time code");
		}

		if (e instanceof PrismaClientKnownRequestError && e.code == "P2002") {
			//throw error(409, "Conflict - User with that email already exists");
			cookies.set('login_error', 'User with that email already exists', { path: '/', httpOnly: true });
			throw redirect(302, '/login');
		}

		console.error(e);

		return new Response(null, {
			status: 500
		});
	}
};