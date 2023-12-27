import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate();

	if (event.url.pathname.startsWith("/dashboard")) {
		//if there is no session redirect to login page
		if (!session) {
			throw redirect(302, "/login");
		}
	}

	if (event.url.pathname.startsWith("/admin")) {
		//if there is no session or the session role is not ADMIN or GOD redirect to home page
		if (!session) {
			throw redirect(302, "/")
		} else if (session.role !== "ADMIN" && session.role !== "GOD") {
			throw redirect(302, "/");
		};
	}


	const response = await resolve(event);

	return response;
};
