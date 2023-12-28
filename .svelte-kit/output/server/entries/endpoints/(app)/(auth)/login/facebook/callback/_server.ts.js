import { f as facebookAuth, a as auth } from "../../../../../../../chunks/lucia.js";
import { OAuthRequestError } from "@lucia-auth/oauth";
const GET = async ({ url, cookies, locals }) => {
  const storedState = cookies.get("facebook_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }
  try {
    const { getExistingUser, facebookUser, createUser } = await facebookAuth.validateCallback(code);
    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser)
        return existingUser;
      const user2 = await createUser({
        attributes: {
          username: facebookUser.login
        }
      });
      return user2;
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
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
};
export {
  GET
};
