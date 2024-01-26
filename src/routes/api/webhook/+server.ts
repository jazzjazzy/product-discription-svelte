import type { RequestHandler } from './$types';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';
import {
    trialEndingSoon,
    invoicePaymentFailed,
    customerSubscriptionDeleted,
    customerSubscriptionUpdate
} from '$lib/server/stripe';
import { json } from '@sveltejs/kit'
import { dev } from '$app/environment';



export const POST: RequestHandler = async ({ request }) => {
    const endpointSecret = "whsec_ecc524212f1327aa93f426f21ba54cad008f6c5e986a34fea1ab217329262d1b";
    const sig: string | null = request.headers.get('stripe-signature');
    let event;

    try {
        // if we are in production and we need to verify the signature or testing with a signature
        if (sig !== null) {
            const body = await request.text();
            event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
        } else {
            // else we don't have a signature, if we are in dev mode we are manually testing the webhook
            if (dev) {
                let body = await request.text();
                event = JSON.parse(body);
            }
        }

    } catch (err) {
        return json({
            status: 400,
            body: `Webhook Error: ${(err as Error).message}`
        });
    }
    try {
        switch (event.type) {
            case 'invoice.payment_failed':
                const invoicePaymentFailedObj = event.data.object;
                await invoicePaymentFailed(invoicePaymentFailedObj.customer);
                break;
            case 'customer.subscription.trial_will_end':
                const customerSubscriptionTrialWillEnd = event.data.object;
                await trialEndingSoon(customerSubscriptionTrialWillEnd.id, customerSubscriptionTrialWillEnd.customer);
                break;
            case 'customer.subscription.deleted':
                const customerSubscriptionDeletedObj = event.data.object;
                await customerSubscriptionDeleted(
                    customerSubscriptionDeletedObj.id,
                    customerSubscriptionDeletedObj.customer,
                    customerSubscriptionDeletedObj.cancellation_details.reason
                );

                console.log('customer.subscription.deleted', customerSubscriptionDeletedObj);
                break;
            case 'customer.subscription.updated':
                const customerSubscriptionUpdateObj = event.data.object;
                await customerSubscriptionUpdate(customerSubscriptionUpdateObj);
                console.log('customer.subscription.updated', customerSubscriptionUpdateObj);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return json({
            status: 200, // OK status
            headers: { 'Content-Type': 'application/json' },
            body: { message: 'Webhook processed' }
        });
    } catch (error) {
        console.error(error);
        return json({
            status: 400,
            body: `Webhook Error: ${(error as Error).message}`
        });

    }
};