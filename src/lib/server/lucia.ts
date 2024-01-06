import { lucia, type SessionSchema } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { google, facebook } from "@lucia-auth/oauth/providers";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } from "$env/static/private";

const client = new PrismaClient();

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: prisma(client),

	getUserAttributes: (data) => {
		return {
			login: data.email,
			email: data.email,
			emailVerified: data.email_verified 
		};
	},

	getSessionAttributes: (dataAttr: SessionSchema) => {
		return {
			name: dataAttr.name,
			plan: dataAttr.plan,
			role: dataAttr.role,
			subscribed: dataAttr.subscribed
		}
	}
});

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: "http://localhost:8080/login/google/callback",
	scope: ['email', 'profile']
});

export const facebookAuth = facebook(auth, {
	clientId: FACEBOOK_CLIENT_ID,
	clientSecret: FACEBOOK_CLIENT_SECRET,
	redirectUri: "http://localhost:8080/login/facebook/callback",
	scope: ["email", "public_profile"]
});
