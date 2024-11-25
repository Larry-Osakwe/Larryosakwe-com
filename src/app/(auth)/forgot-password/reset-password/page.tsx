import { ResetPasswordPage } from "@/components/auth/pages/ResetPasswordPage";
import { Metadata } from "next";
import { getSEOTags } from "@/lib/seo/seo";

export const metadata: Metadata = getSEOTags({
  title: "Reset Password",
  description: "Reset your password",
  robots: {
    index: false,
    follow: false
  }
});

export default function Page() {
  return <ResetPasswordPage />;
}