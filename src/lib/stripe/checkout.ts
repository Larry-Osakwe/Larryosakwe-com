import { stripe } from "./stripeClient";
import { config } from "@/config";
import { CheckoutMode } from "@/types/stripe";
import Stripe from "stripe";

interface CreateCheckoutParams {
  priceId: string;
  mode: CheckoutMode;
  successUrl?: string;
  cancelUrl?: string;
  coupon?: string;
}

export async function createCheckout({ 
  priceId, 
  mode,
  coupon,
  successUrl = `${process.env.NEXT_PUBLIC_URL}/purchase/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`
}: CreateCheckoutParams) {
  // Validate priceId exists in our plans
  const plan = config.stripe.plans.find(p => p.priceId === priceId);
  if (!plan) {
    throw new Error("Invalid price ID");
  }

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: 'always',
    payment_intent_data: { setup_future_usage: 'on_session' },
    tax_id_collection: { enabled: true },
    metadata: {
      planName: plan.name,
      mode: mode,
    },
  };

  // If there's a coupon in the plan, use discounts
  // Otherwise, allow users to enter promotion codes
  if (plan.couponId) {
    sessionConfig.discounts = [
      {
        coupon: plan.couponId,
      },
    ];
  } else {
    sessionConfig.allow_promotion_codes = true;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);
  return session;
}
