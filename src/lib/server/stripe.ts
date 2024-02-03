// in src/lib/server/stripe.js
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import { Prisma } from '@prisma/client';
import prisma from '$lib/server/prisma'
import { json } from '@sveltejs/kit'
// export the stripe instance
export const stripe = new Stripe(SECRET_STRIPE_KEY)
import type{ customerSubscriptionUpdateObj } from '$lib/types/webhooks';





/*** WEBHOOKS ***/
export async function invoicePaymentFailed(subscription: string) {

    try {
        await prisma.subscription.update({
            where: {
                stripe_customer_id: subscription
            },
            data: {
                stripe_payment_failed: {
                    increment: 1
                }
            }
        })

    } catch (error: unknown) {
        let message: string = '';
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            message = `invoice Payment Failed : Webhook Error: ${subscription} not found in database`;
            // Handle the case where the record doesn't exist
        } else {
            message = "An unexpected error occurred", error;
            // Handle other kinds of errors
        }
        throw new Error(message);
    }
}

export async function customerSubscriptionDeleted(subscription: string, customer: string, reason: string) {
    try {
        await prisma.subscription.update({
            where: {
                stripe_subscription_id: subscription,
                stripe_customer_id: customer
            },
            data: {
                stripe_deleted_at: new Date().toISOString(), // Current date-time in ISO format
                stripe_deleted_reason: reason,
                deleted_at: new Date().toISOString() // Current date-time in ISO format

            }
        })
    } catch (error: unknown) {
        let message: string = '';
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            message = `customer Subscription Deleted: Webhook Error: subscription ${subscription} and customer ${customer} not found in database`;
            // Handle the case where the record doesn't exist
        } else {
            message = "An unexpected error occurred", error;
            // Handle other kinds of errors
        }
        throw new Error(message);
    }
}

export async function trialEndingSoon(subscription: string, customer: string) {
    try {
        await prisma.subscription.update({
            where: {
                stripe_subscription_id: subscription,
                stripe_customer_id: customer
            },
            data: {
                trial_ending_soon: true
            }
        })
    } catch (error: unknown) {
        let message: string = '';
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            message = `Trial Ending Soon : Webhook Error: subscription ${subscription} and customer ${customer} not found in database`;
            // Handle the case where the record doesn't exist
        } else {
            message = "An unexpected error occurred", error;
            // Handle other kinds of errors
        }
        throw new Error(message);
    }
}

/**
 * 
 * @param subscriptionObj 
 */
export async function customerSubscriptionUpdate(customerSubscriptionUpdateObj: customerSubscriptionUpdateObj) {

    try {
        await prisma.subscription.update({
            where: {
                stripe_subscription_id: customerSubscriptionUpdateObj.id,
                stripe_customer_id: customerSubscriptionUpdateObj.customer,
            },
            data: {
                //status: customerSubscriptionUpdateObj.status,
                stripe_status: customerSubscriptionUpdateObj.status,
                //canceled_at: customerSubscriptionUpdateObj.canceled_at,
                stripe_cancel_at: customerSubscriptionUpdateObj.cancel_at ? new Date(customerSubscriptionUpdateObj.cancel_at * 1000).toISOString() : null,
                stripe_cancel_at_period_end: customerSubscriptionUpdateObj.cancel_at_period_end,
                stripe_canceled_at: customerSubscriptionUpdateObj.canceled_at ? new Date(customerSubscriptionUpdateObj.canceled_at * 1000).toISOString() : null,
                //next payment date
                stripe_current_period_end : customerSubscriptionUpdateObj.current_period_end ? new Date(customerSubscriptionUpdateObj.current_period_end * 1000).toISOString() : null,
            }
        })
    } catch (error: unknown) {
        let message: string = '';
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            message = `Customer Subscription Update: Webhook Error: subscription ${customerSubscriptionUpdateObj.id} and customer ${customerSubscriptionUpdateObj.customer} not found in database`;
            // Handle the case where the record doesn't exist
        } else {
            message = "An unexpected error occurred " + error;
            // Handle other kinds of errors
        }
        throw new Error(message);
    }
}