import { createResendClient } from './client';
import { PurchaseEmail, PasswordChangedEmail } from '@/components/emails';
import type { EmailResponse } from './types';
import { config } from '@/config';

/**
 * Sends a purchase confirmation email to the customer
 * 
 * This email is triggered after a successful purchase/subscription
 * and includes:
 * - Purchase confirmation details
 * - Link to dashboard
 * - Product information
 * 
 * @param customerEmail - The recipient's email address
 * @param productName - Name of the purchased product/plan
 * @returns EmailResponse with success data or error
 * 
 * @example
 * ```ts
 * await sendPurchaseEmail(
 *   "customer@example.com",
 *   "Premium Plan"
 * );
 * ```
 */
export async function sendPurchaseEmail(customerEmail: string, productName: string): Promise<EmailResponse> {
  const resend = createResendClient();
  try {
    const { data, error } = await resend.emails.send({
      from: `${config.resend.from.name} <${config.resend.from.email}>`,
      replyTo: config.resend.replyTo,
      to: customerEmail,
      subject: 'Thank you for your purchase!',
      react: PurchaseEmail({
        customerEmail,
        productName,
        dashboardUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { error };
    }

    return { data };
  } catch (e) {
    console.error("Email sending error:", e);
    return { error: e };
  }
}

/**
 * Sends a notification email when a user's password is changed
 * 
 * This email is sent as a security measure to notify users
 * of password changes on their account
 * 
 * @param email - The user's email address
 * @returns EmailResponse with success data or error
 * 
 * @example
 * ```ts
 * await sendPasswordChangedEmail("user@example.com");
 * ```
 */
export async function sendPasswordChangedEmail(email: string): Promise<EmailResponse> {
  const resend = createResendClient();
  try {
    const { data, error } = await resend.emails.send({
      from: `${config.resend.from.name} <${config.resend.from.email}>`,
      replyTo: config.resend.replyTo,
      to: email,
      subject: 'Your FlareStack Password Has Been Changed',
      react: PasswordChangedEmail({
        email,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return { error };
    }

    return { data };
  } catch (e) {
    console.error("Email sending error:", e);
    return { error: e };
  }
}