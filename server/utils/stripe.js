import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  console.error("Stripe secret key is missing!");
}

const stripe = new Stripe(key || "sk_test_placeholder");

export default stripe;