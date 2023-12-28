import { r as redirect } from "../../../../../chunks/index.js";
import { z } from "zod";
import { a as auth } from "../../../../../chunks/lucia.js";
const load = async (event) => {
  return {};
};
const schema = z.object({
  firstname: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(64, { message: "First name must be at most 64 characters long" }),
  surname: z.string().min(2, { message: "First name must be at least 2 characters long" }).max(64, { message: "First name must be at most 64 characters long" }),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string()
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match Password Confirm",
      path: ["password"]
    });
    ctx.addIssue({
      code: "custom",
      message: "Passwords Confirm do not match Password",
      path: ["confirmPassword"]
    });
  }
});
const actions = {
  default: async ({ locals, request }) => {
    const formData = Object.fromEntries(await request.formData());
    try {
      const result = schema.parse(formData);
      const user = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: result.email,
          password: result.password
        },
        attributes: {
          email: result.email,
          firstname: result.firstname,
          surname: result.surname
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {
          name: `${result.firstname} ${result.surname}`,
          role: "USER",
          subscribed: false,
          plan: void 0
        }
      });
      locals.auth.setSession(session);
    } catch (err) {
      console.log("exception:: ", err);
      const { fieldErrors: errors } = err.flatten();
      const { password, passwordConfirm, ...rest } = formData;
      return {
        data: rest,
        errors
      };
    }
    throw redirect(302, "/dashboard");
  }
};
export {
  actions,
  load
};
