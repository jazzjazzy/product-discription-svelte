import type { PageServerLoad } from './$types';
import type { User as PrismaUser } from '$lib/types/user';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { auth } from '$lib/server/lucia';
import { stripe } from '$lib/server/stripe';
import { LuciaError } from '$lib/server/lucia';
import { string } from 'zod';

export const load = (async ({ locals }) => {

    const session = await locals.auth.validate();

    if (!session) {
        throw redirect(302, "/login");
    }

    let user: PrismaUser | null = await prisma.user.findUnique({ where: { id: session.user.userId }, include: { auth_session: true, key: true, subscription: true } })


    return { user };
}) satisfies PageServerLoad;


export const actions = {
    // change password form action
    changePassword: async ({ request, locals }) => {

        const session = await locals.auth.validate();
        const form = await request.formData()

        const userId = session.user.userId;
        const oldPassword = form.get('oldpassword');
        const newPassword = form.get('newpassword');
        const confirmPassword = form.get('confirmpassword');

        console.log("form", form)

        console.log("oldPassword", oldPassword)
        console.log("newPassword", newPassword)
        console.log("confirmPassword", confirmPassword)

        if(!!oldPassword || !!newPassword || !!confirmPassword){
            return {
                status: 411,
                body: {
                    error: 'Please fillout all fields.',
                    errorType: "resetPassword"
                }
            };
        }

        // lets check to see if they got the old password right
        try {
            const key = await auth.useKey('email', session.user.login, oldPassword); // validate password too
            const user = await auth.getUser(key.userId);
        } catch (e) {
            if (e.message === "AUTH_INVALID_KEY_ID") {
                return {
                    status: 401,
                    body: {
                        error: 'Current password is invalid.',
                        errorType: "resetPassword"
                    }
                }
            };
            if (e.message === "AUTH_INVALID_PASSWORD") {
                return {
                    status: 411,
                    body: {
                        error: 'Current password is incorrect.',
                        errorType: "resetPassword"
                    }
                };
            }
        }

        // let confirm the new password and the confirm password match
        if (newPassword !== confirmPassword) {
            return {
                status: 411,
                body: {
                    error: 'New password and Confirm password do not match.',
                    errorType: "resetPassword"
                }
            };
        }

        await auth.updateKeyPassword('email', session.user.login, newPassword);

        return {
            status: 200,
            body: { error: 'Password Reset' }
        };

    },
    cancelSub: async ({ request, locals }) => {
        const session = await locals.auth.validate();
        const form = await request.formData()

        let user: PrismaUser | null = await prisma.user.findUnique({
            where: {
                id: session.user.userId
            },
            include: {
                auth_session: true,
                key: true,
                subscription: true
            }
        })

        if (!user || user.subscription.length === 0) {
            return {
                status: 401,
                body: { error: 'User Subscription not found.' }
            };
        }
        console.log("user Subscription", user?.subscription[0]?.stripe_subscription_id)
        let deletedSubscription = await cancelSubscription(user?.subscription[0]?.stripe_subscription_id)
        console.log("deletedSubscription", deletedSubscription)
        return {
            status: 200,
            body: deletedSubscription
        };

    },
    deleteAccount: async ({ request, locals }) => {

    }
}


async function cancelSubscription(subscriptionId) {
    try {
        //const deletedSubscription = await stripe.subscriptions.del(subscriptionId);
        // Optionally, cancel at the end of the current billing period:
        const deletedSubscription = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

        // Update your database to reflect the subscription's cancellation
        // ...

        return deletedSubscription;
    } catch (error) {
        // Handle error
        console.error("Error canceling subscription:", error);
    }
}
