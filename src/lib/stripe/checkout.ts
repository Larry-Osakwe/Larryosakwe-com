import { stripe } from "./stripeClient";
import { config } from "@/config";
import { CheckoutMode } from "@/types/config";
import Stripe from "stripe";

/**
 * Parameters for creating a Stripe Checkout session
 * @param priceId - The Stripe Price ID from your dashboard
 * @param mode - Either 'payment' (one-time) or 'subscription' (recurring)
 * @param successUrl - Where to redirect after successful payment
 * @param cancelUrl - Where to redirect if user cancels
 * @param coupon - Optional coupon code to apply
 */
interface CreateCheckoutParams {
  priceId: string;
  mode: CheckoutMode;
  successUrl?: string;
  cancelUrl?: string;
  coupon?: string;
}

/**
 * Creates a Stripe Checkout session for processing payments
 * 
 * This function handles:
 * - One-time payments and subscriptions
 * - Automatic customer creation
 * - Coupon/promotion code application
 * - Success/cancel URL routing
 * 
 * @example
 * ```ts
 * const session = await createCheckout({
 *   priceId: "price_H1234...",
 *   mode: "subscription",
 *   successUrl: "https://yourapp.com/success"
 * });
 * ```
 */
export async function createCheckout({
  priceId,
  mode,
  coupon,
  // Default success URL includes the session ID for post-purchase verification
  successUrl = `${process.env.NEXT_PUBLIC_URL}/purchase/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  // Default cancel URL returns to homepage
  cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`
}: CreateCheckoutParams) {
  // Validate that the priceId exists in our configured plans
  const plan = config.stripe.plans.find(p => p.priceId === priceId);
  if (!plan) {
    throw new Error("Invalid price ID");
  }

  /**
   * Core Stripe Checkout configuration
   * See full options at: https://stripe.com/docs/api/checkout/sessions/create
   */
  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
    payment_method_types: ['card'],          // Accept credit/debit cards
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: 'always',             // Create a Customer record for future reference
    payment_intent_data: { 
      setup_future_usage: 'on_session'       // Allow saving payment method for future purchases
    },
    tax_id_collection: { enabled: true },    // Allow customers to input tax IDs
    metadata: {                              // Custom data to help identify this purchase
      planName: plan.name,
      mode: mode,
    },
  };

  /**
   * Handle discounts/promotions in two ways:
   * 1. If the plan has a couponId: Automatically apply it
   * 2. Otherwise: Allow customers to enter their own promotion codes
   */
  if (plan.couponId) {
    sessionConfig.discounts = [
      {
        coupon: plan.couponId,
      },
    ];
  } else {
    sessionConfig.allow_promotion_codes = true;
  }

  // Create and return the Checkout session
  const session = await stripe.checkout.sessions.create(sessionConfig);
  return session;
}
