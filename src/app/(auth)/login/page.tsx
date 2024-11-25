import { Metadata } from "next";
import { Suspense } from "react";
import { UserAuthForm } from "@/components/auth/forms";
import { AuthLayout } from "@/components/auth/common";
import { redirect } from "next/navigation";
import { getSEOTags } from "@/lib/seo/seo";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = getSEOTags({
  title: "Login",
  description: "Login to your account",
  openGraph: {
    title: "Login to FlareStack",
    description: "Access your FlareStack account"
  }
});

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout
        heading="Welcome back"
        subheading="Enter your credentials to access your account"
        showImage={true}
      >
        <UserAuthForm type="login" />
      </AuthLayout>
    </Suspense>
  );
}