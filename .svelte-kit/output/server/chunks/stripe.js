import Stripe from "stripe";
import { S as SECRET_STRIPE_KEY } from "./private.js";
const stripe = Stripe(SECRET_STRIPE_KEY);
export {
  stripe as s
};
