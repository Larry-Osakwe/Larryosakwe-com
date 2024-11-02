import { Resend } from 'resend';
import { PurchaseEmail, WelcomeEmail, PasswordChangedEmail } from '@/components/Emails';

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

export async function sendWelcomeWithPasswordEmail(email: string, tempPassword: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FlareStack <info@flarestack.io>',
      to: email,
      subject: 'Welcome to FlareStack - Your Account Details',
      react: WelcomeEmail({
        email,
        tempPassword,
        loginUrl: `${process.env.NEXT_PUBLIC_URL}/login`,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { error };
    }

    return { data };
  } catch (e) {
    console.error("Welcome email sending error:", e);
    return { error: e };
  }
}

export async function sendPasswordChangedEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'FlareStack <info@flarestack.io>',
      to: email,
      subject: 'Your FlareStack Password Has Been Changed',
      react: PasswordChangedEmail({
        email,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Failed to send password changed email:", error);
      return { error };
    }

    return { data };
  } catch (e) {
    console.error("Password changed email sending error:", e);
    return { error: e };
  }
}

// Add other email sending functions as needed 