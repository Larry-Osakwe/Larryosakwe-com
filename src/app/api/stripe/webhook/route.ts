import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripeClient";
import { createClient } from "@/lib/supabase/supabaseServer";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Webhook error" },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update user's subscription status in your database
        if (session.customer_email) {
          const { error } = await supabase
            .from('profiles')  // or whatever your table name is
            .update({ 
              subscription_status: 'active',
              stripe_customer_id: session.customer,
              // Add any other relevant fields
            })
            .eq('email', session.customer_email);

          if (error) throw error;
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription status
        const { error } = await supabase
          .from('profiles')
          .update({ 
            subscription_status: subscription.status,
            // Add any other relevant fields
          })
          .eq('stripe_customer_id', subscription.customer);

        if (error) throw error;
        break;
      }

      // Add other webhook events as needed
      // https://stripe.com/docs/api/events/types
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, need raw body for Stripe webhook
  },
};
