import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/stripe/checkout";

export async function POST(request: Request) {
  try {
    const { priceId, mode = 'payment' } = await request.json();

    const session = await createCheckout({
      priceId,
      mode,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: error instanceof Error && error.message === 'Invalid price ID' ? 400 : 500 }
    );
  }
}
