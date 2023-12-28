import { f as fail, r as redirect } from "../../../../../chunks/index.js";
import { zfd } from "zod-form-data";
import { a as auth } from "../../../../../chunks/lucia.js";
import { p as prisma } from "../../../../../chunks/prisma.js";
const actions = {
  signin: async ({ locals, request }) => {
    const data = await request.formData();
    const schema = zfd.formData({
      email: zfd.text(),
      password: zfd.text()
    });
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
      return fail(400, { message: "Invalid form data", errors: result.error.errors });
    }
    try {
      const key = await auth.useKey("email", result.data.email, result.data.password);
      var { name, role, subscribed, plan } = await getUserlogin(key.userId);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {
          name,
          role,
          subscribed,
          plan
        }
      });
      locals.auth.setSession(session);
    } catch (e) {
      console.log("e", e);
      return fail(400, { message: e.message + " = " + e.code });
    }
    if (role && role === "ADMIN" || role === "GOD") {
      throw redirect(302, "/admin");
    }
    throw redirect(302, "/dashboard");
  },
  signout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session)
      throw redirect(302, "/login");
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, "/login");
  }
};
async function getUserlogin(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: {
        include: {
          Pricing: true
        }
      }
    }
  });
  let name = `${user?.firstname} ${user?.surname}`;
  let role = user?.role;
  let subscribed = !user?.subscription[0] ? false : true;
  let plan = user?.subscription[0]?.Pricing?.name;
  return { name, role, subscribed, plan };
}
export {
  actions
};
