import { Resend } from 'resend';
import { PurchaseEmail, WelcomeEmail } from '@/components/Emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseEmail(customerEmail: string, productName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FlareStack <info@flarestack.io>',
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

export async function sendWelcomeEmail(email: string, tempPassword?: string) {
  // Similar implementation for welcome emails
}

// Add other email sending functions as needed 