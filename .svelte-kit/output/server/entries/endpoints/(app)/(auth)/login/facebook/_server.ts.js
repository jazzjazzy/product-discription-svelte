import { d as dev } from "../../../../../../chunks/environment.js";
import { f as facebookAuth } from "../../../../../../chunks/lucia.js";
const GET = async ({ cookies }) => {
  const [url, state] = await facebookAuth.getAuthorizationUrl();
  cookies.set("facebook_oauth_state", state, {
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
