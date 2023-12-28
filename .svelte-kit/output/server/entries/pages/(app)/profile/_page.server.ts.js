import { r as redirect } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
import { a as auth } from "../../../../chunks/lucia.js";
import { s as stripe } from "../../../../chunks/stripe.js";
const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, "/login");
  }
  let user = await prisma.user.findUnique({ where: { id: session.user.userId }, include: { auth_session: true, key: true, subscription: true } });
  return { user };
};
const actions = {
  // change password form action
  changePassword: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    const form = await request.formData();
    session.user.userId;
    const oldPassword = form.get("oldpassword");
    const newPassword = form.get("newpassword");
    const confirmPassword = form.get("confirmpassword");
    if (!!oldPassword || !!newPassword || !!confirmPassword) {
      return {
        status: 411,
        body: {
          error: "Please fillout all fields.",
          errorType: "resetPassword"
        }
      };
    }
    try {
      const key = await auth.useKey("email", session.user.login, oldPassword);
      const user = await auth.getUser(key.userId);
    } catch (e) {
      if (e.message === "AUTH_INVALID_KEY_ID") {
        return {
          status: 401,
          body: {
            error: "Current password is invalid.",
            errorType: "resetPassword"
          }
        };
      }
      if (e.message === "AUTH_INVALID_PASSWORD") {
        return {
          status: 411,
          body: {
            error: "Current password is incorrect.",
            errorType: "resetPassword"
          }
        };
      }
    }
    if (newPassword !== confirmPassword) {
      return {
        status: 411,
        body: {
          error: "New password and Confirm password do not match.",
          errorType: "resetPassword"
        }
      };
    }
    await auth.updateKeyPassword("email", session.user.login, newPassword);
    return {
      status: 200,
      body: { message: "Password Reset" }
    };
  },
  cancelSub: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    await request.formData();
    let user = await prisma.user.findUnique({
      where: {
        id: session.user.userId
      },
      include: {
        auth_session: true,
        key: true,
        subscription: true
      }
    });
    if (!user || user.subscription.length === 0) {
      return {
        status: 401,
        body: { error: "User Subscription not found." }
      };
    }
    let deletedSubscription = await cancelSubscription(user?.subscription[0]?.stripe_subscription_id);
    return {
      status: 200,
      body: deletedSubscription
    };
  },
  deleteAccount: async ({ request, locals }) => {
  },
  updateUser: async ({ request, locals }) => {
    const session = await locals.auth.validate();
    const form = await request.formData();
    const firstname = form.get("firstname");
    const surname = form.get("surname");
    const email = form.get("email");
    console.log("session", session);
    try {
      await auth.updateUserAttributes(
        session.user.userId,
        {
          firstname,
          surname,
          email
        }
      );
      console.log("session.user.login", session.user.login);
      console.log("email", email);
      const sessionNew = await auth.updateSessionAttributes(
        session.sessionId,
        {
          name: `${firstname} ${surname}`
        }
      );
      locals.auth.setSession(sessionNew);
    } catch (e) {
      console.error(e);
      return {
        status: 411,
        body: {
          error: e.message,
          errorType: "updateprofile"
        }
      };
    }
  }
};
async function cancelSubscription(subscriptionId) {
  try {
    const deletedSubscription = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    return deletedSubscription;
  } catch (error) {
    console.error("Error canceling subscription:", error);
  }
}
export {
  actions,
  load
};
