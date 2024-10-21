import { ConfirmationPage } from "@/components/ConfirmationPage";

export default function PasswordResetConfirmation() {
  return (
    <ConfirmationPage
      title="Check Your Email"
      message="We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password."
    />
  );
}
