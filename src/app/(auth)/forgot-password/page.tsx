import { ForgotPasswordPage } from "@/components/auth/pages/ForgotPasswordPage";
import { getSEOTags } from "@/lib/seo/seo";
import { Metadata } from "next";

export const metadata: Metadata = getSEOTags({
  title: "Forgot Password",
  description: "Reset your password",
  robots: {
    index: false,
    follow: false
  }
});

export default function Page() {
  return <ForgotPasswordPage />;
}