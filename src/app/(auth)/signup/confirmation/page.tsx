import { StatusPage } from "@/components/shared/feedback/StatusPage";

export default function SignupConfirmation() {
  return (
    <StatusPage
      title="Check Your Email"
      message="We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account."
    />
  );
}
