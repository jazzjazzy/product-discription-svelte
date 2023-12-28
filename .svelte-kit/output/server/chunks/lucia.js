import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { google, facebook } from "@lucia-auth/oauth/providers";
import { G as GOOGLE_CLIENT_ID, a as GOOGLE_CLIENT_SECRET, F as FACEBOOK_CLIENT_ID, b as FACEBOOK_CLIENT_SECRET } from "./private.js";
const client = new PrismaClient();
const auth = lucia({
  env: "PROD",
  middleware: sveltekit(),
  adapter: prisma(client),
  getUserAttributes: (data) => {
    return {
      login: data.email
    };
  },
  getSessionAttributes: (dataAttr) => {
    return {
      name: dataAttr.name,
      plan: dataAttr.plan,
      role: dataAttr.role,
      subscribed: dataAttr.subscribed
    };
  }
});
const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:8080/login/google/callback"
});
const facebookAuth = facebook(auth, {
  clientId: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  redirectUri: "http://localhost:8080/login/facebook/callback"
});
export {
  auth as a,
  facebookAuth as f,
  googleAuth as g
};
