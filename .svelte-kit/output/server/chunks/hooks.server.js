import { a as auth } from "./lucia.js";
import { r as redirect } from "./index.js";
const handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  const session = await event.locals.auth.validate();
  if (event.url.pathname.startsWith("/dashboard")) {
    if (!session) {
      throw redirect(302, "/login");
    }
  }
  if (event.url.pathname.startsWith("/admin")) {
    if (!session) {
      throw redirect(302, "/");
    } else if (session.role !== "ADMIN" && session.role !== "GOD") {
      throw redirect(302, "/");
    }
  }
  const response = await resolve(event);
  return response;
};
export {
  handle
};
