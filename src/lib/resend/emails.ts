import { createResendClient } from './client';
import { PurchaseEmail, PasswordChangedEmail } from '@/components/emails';
import type { EmailResponse } from './types';
import { config } from '@/config';

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