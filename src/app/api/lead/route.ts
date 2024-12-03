import { createClient } from "@/lib/supabase/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    // Try to upsert the lead
    const { data, error } = await supabase
      .from('leads')
      .upsert(
        { email },
        { 
          onConflict: 'email',
          ignoreDuplicates: true 
        }
      )
      .select('created_at');

    if (error) {
      console.error('Error processing subscription:', error);
      return NextResponse.json(
        { error: 'Failed to process subscription. Please try again.' },
        { status: 500 }
      );
    }

    // If no rows were affected, it was a duplicate
    const isNewSubscription = data && data.length > 0;

    return NextResponse.json(
      { 
        message: isNewSubscription 
          ? 'Successfully subscribed to the newsletter!' 
          : "You're already subscribed to our newsletter!"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}