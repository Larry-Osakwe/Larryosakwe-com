import { stripe } from "./stripeClient";
import { createClient } from "@/lib/supabase/supabaseServer";
import { sendPurchaseEmail } from '@/lib/resend/emails';
import { config } from "@/config";
import Stripe from "stripe";

/**
 * Handles successful checkout completion
 * This is triggered when a customer successfully completes payment
 * 
 * Actions performed:
 * 1. Retrieves expanded session data from Stripe
 * 2. Creates or updates user in Supabase
 * 3. Sends confirmation email
 * 4. Sets up user access
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createClient(true);
  
  // Get detailed session information including line items and customer data
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

  // Check if the user already exists in our database
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', customerEmail)
    .single();

  if (existingUser) {
    // Update existing user's subscription information
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

    // Send purchase confirmation email
    await sendPurchaseEmail(customerEmail, config.appName);
  } else {
    // Create new user flow
    console.log('Creating new user for:', customerEmail);
    
    // Create auth user with confirmed email
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: customerEmail,
      email_confirm: true,
    });

    if (createError) throw createError;

    // Create user profile with subscription details
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

    // Send password reset email for new users to set their password
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      customerEmail,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/confirm?type=recovery&next=/forgot-password/reset-password`,
      }
    );

    if (resetError) throw resetError;
  }
}

/**
 * Handles subscription deletion
 * Triggered when a subscription is cancelled or expires
 * 
 * Updates the user's access status in the database
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = createClient(true);
  await supabase
    .from('profiles')
    .update({ has_access: false })
    .eq('customer_id', subscription.customer);
}

/**
 * Main webhook handler that processes various Stripe events
 * 
 * Supported events:
 * - checkout.session.completed: Payment successful
 * - checkout.session.expired: Payment not completed
 * - customer.subscription.updated: Subscription plan changed
 * - customer.subscription.deleted: Subscription cancelled
 * 
 * @example
 * ```ts
 * // In your API route
 * const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
 * await handleWebhookEvent(event);
 * ```
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  console.log('Processing webhook event:', event.type);

  switch (event.type) {
    case 'checkout.session.completed': {
      // Payment was successful, provision access
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    }

    case "checkout.session.expired": {
      // Payment was abandoned or failed
      // Optional: Implement abandoned cart recovery emails
      break;
    }

    case "customer.subscription.updated": {
      // Subscription plan changed or renewal processed
      // Optional: Track subscription changes or send notification emails
      // Note: Major status changes (like cancellation) are handled by customer.subscription.deleted
      break;
    }

    case 'customer.subscription.deleted': {
      // Subscription was cancelled or expired
      const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id);
      await handleSubscriptionDeleted(subscription);
      break;
    }

    // TODO: Additional events to consider implementing:
    // - invoice.paid: Successful subscription renewal
    // - invoice.payment_failed: Failed subscription renewal
    // - customer.updated: Customer details changed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
} 