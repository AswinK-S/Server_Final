

import Stripe from 'stripe';
const secretKey:string =process.env.Stripe_SK as string
const stripe = new Stripe(secretKey)

export default stripe