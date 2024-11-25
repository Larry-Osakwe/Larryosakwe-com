import { stripe } from "./stripeClient";
import { createClient } from "@/lib/supabase/supabaseServer";
import { sendPurchaseEmail } from '@/lib/resend/emails';
import { config } from "@/config";
import Stripe from "stripe";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createClient(true);
  
  const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items', 'customer'],
  });
  
  const customer = expandedSession.customer as Stripe.Customer;
  const customerId = customer.id;
  const customerEmail = customer.email;
  const priceId = expandedSession.line_items?.data[0]?.price?.id;

  if (!customerEmail) {
    throw new Error('No customer email found');
  }

  // Check if user exists
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', customerEmail)
    .single();

  if (existingUser) {
    // Existing user flow
    console.log('Updating existing user:', existingUser.id);
    
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        customer_id: customerId,
        price_id: priceId,
        has_access: true,
        name: customer.name || null
      })
      .eq('id', existingUser.id);

    if (updateError) {
      throw updateError;
    }

    await sendPurchaseEmail(customerEmail, config.appName);
  } else {
    // New user flow
    console.log('Creating new user for:', customerEmail);
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: customerEmail,
      email_confirm: true,
    });

    if (createError) throw createError;

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        email: customerEmail,
        customer_id: customerId,
        price_id: priceId,
        has_access: true,
        name: customer.name || null
      })
      .eq('id', newUser.user.id);

    if (profileError) throw profileError;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      customerEmail,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/confirm?type=recovery&next=/forgot-password/reset-password`,
      }
    );

    if (resetError) throw resetError;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = createClient(true);
  await supabase
    .from('profiles')
    .update({ has_access: false })
    .eq('customer_id', subscription.customer);
}

export async function handleWebhookEvent(event: Stripe.Event) {
  console.log('Processing webhook event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed': {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    }

    case "checkout.session.expired": {
      // User didn't complete the transaction
      // You don't need to do anything here, but you can send an email to the user to remind them to complete the transaction
      break;
    }

    case "customer.subscription.updated": {
      // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
      // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
      // You can update the user data to show a "Cancel soon" badge for instance
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id);
      await handleSubscriptionDeleted(subscription);
      break;
    }

    //TODO: Add other events like invoice.paid, invoice.payment_failed, etc...
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
} 