import { StatusPage } from "@/components/shared/feedback/StatusPage";
import { Metadata } from "next";
import { getSEOTags } from "@/lib/seo/seo";

export const metadata: Metadata = getSEOTags({
  title: "Check Your Email",
  description: "We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account.",
  robots: {
    index: false,
    follow: false
  }
});

export default function SignupConfirmation() {
  return (
    <StatusPage
      title="Check Your Email"
      message="We've sent a confirmation link to your email address. Please check your inbox and click the link to activate your account."
    />
  );
}
