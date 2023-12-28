import { d as dev } from "../../../../../../chunks/environment.js";
import { g as googleAuth } from "../../../../../../chunks/lucia.js";
const GET = async ({ cookies }) => {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: !dev,
    path: "/",
    maxAge: 60 * 60
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString()
    }
  });
};
export {
  GET
};
