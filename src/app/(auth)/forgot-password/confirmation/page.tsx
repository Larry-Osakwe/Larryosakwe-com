import { StatusPage } from "@/components/shared/feedback/StatusPage";
import { getSEOTags } from "@/lib/seo/seo";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: "Check Your Email",
  description: "We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.",
  robots: {
    index: false,
    follow: false
  }
});

export default function PasswordResetConfirmation() {
  return (
    <StatusPage
      title="Check Your Email"
      message="We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password."
    />
  );
}
