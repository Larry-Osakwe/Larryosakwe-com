import { stripe } from "@/lib/stripe/stripeClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleWebhookEvent } from "@/lib/stripe/webhooks";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  try {
    if (!signature) {
      throw new Error('No signature found');
    }

    const event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      process.env.STRIPE_SIGNING_SECRET!
    );

    await handleWebhookEvent(event);
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse(
      `Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
      { status: 400 }
    );
  }
}
