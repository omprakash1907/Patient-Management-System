// config/stripeConfig.js
const Stripe = require('stripe');
const stripe = new Stripe('your_stripe_secret_key'); // Replace with your actual Stripe secret key

module.exports = stripe;
