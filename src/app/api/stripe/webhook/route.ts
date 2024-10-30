import { config } from "@/config";
import { stripe } from "@/lib/stripe/stripeClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/supabaseServer";
import { sendPurchaseEmail } from '@/lib/resend/sendEmail';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  let event;
  let eventType;

  const supabase = createClient(true);

  try {
    if (!signature) {
      throw new Error('No signature found');
    }
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SIGNING_SECRET!);
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }


  eventType = event.type;

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const session = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
          expand: ['line_items'],
        });
        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price?.id;
        const userId = checkoutSession.client_reference_id;
        const plan = config.stripe.priceId; //TODO: Change this to the actual plan

        const customer = (await stripe.customers.retrieve(customerId as string)) as Stripe.Customer;

        if (!plan) {
            break; //TODO: Handle this. Maybe throw an error?
        }

        let user;

        if (!userId) {
            // Check if the user exists in our database
            const { data: profile} = await supabase.from('profiles').select('*').eq('email', customer.email).single();
            if (profile) {
                user = profile
            } else {
                // Create a new user using supabase auth admin
                const tempPassword = customer.id!.split('_')[1]; // Using part of customer ID as temp password
                const { data } = await supabase.auth.admin.createUser({
                    email: customer.email!,
                    password: tempPassword,
                });

                user = data?.user;

                // TODO: Implement email sending with Resend
                // Send welcome email with temporary credentials
                /*
                await resend.emails.send({
                  from: 'onboarding@yourdomain.com',
                  to: customer.email!,
                  subject: 'Welcome to YourApp - Complete Your Account Setup',
                  html: `
                    <h1>Welcome to YourApp!</h1>
                    <p>An account has been created for you following your purchase.</p>
                    <p>Your temporary login credentials are:</p>
                    <ul>
                      <li>Email: ${customer.email}</li>
                      <li>Temporary Password: ${tempPassword}</li>
                    </ul>
                    <p>Please login and change your password immediately.</p>
                    <a href="${process.env.NEXT_PUBLIC_URL}/login">Login Here</a>
                  `
                });
                */
            }
        } else {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
            user = profile;
        }

        await supabase.from('profiles').update({ customer_id: customerId, price_id: priceId, has_access: true }).eq('id', user?.id);
        
        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        // Send purchase confirmation email
        try {
          const { error } = await sendPurchaseEmail(
            customer.email!,
            config.appName
          );
          
          if (error) {
            console.error("Failed to send purchase email:", error);
          }
        } catch (e) {
          console.error("Email sending failed:", e);
          // Don't throw the error - we don't want to fail the webhook
          // just because email sending failed
        }

        break;
      }
      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Cancel soon" badge for instance
        break;
      }

      case "customer.subscription.deleted": {
        // The subscription has been canceled, you can now remove the user's access from your database
        const stripeObject = event.data.object as Stripe.Subscription;
        const subscription = await stripe.subscriptions.retrieve(stripeObject.id);

        await supabase.from('profiles').update({ has_access: false }).eq('customer_id', subscription.customer);
        break;
      }

      //TODO: Add other events like invoice.paid, invoice.payment_failed, etc...

      default: 
    }
  } catch (error) {
    console.error(`Webhook handler failed. ${error}`);
    return new Response('Webhook handler failed', { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
