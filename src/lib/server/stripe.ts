// in src/lib/server/stripe.js
import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'
// export the stripe instance
export const stripe = new Stripe( SECRET_STRIPE_KEY)
