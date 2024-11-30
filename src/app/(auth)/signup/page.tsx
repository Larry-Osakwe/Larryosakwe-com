import { Metadata } from "next"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getSEOTags } from "@/lib/seo/seo"
import { getCurrentUser } from "@/lib/auth"
import { AuthFormWrapper } from "@/components/auth/common/AuthFormWrapper"

export const metadata: Metadata = getSEOTags({
  title: "Sign Up",
  description: "Create a new account",
  openGraph: {
    title: "Join FlareStack",
    description: "Create your FlareStack account"
  }
});

export default async function SignupPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthFormWrapper
        type="signup"
        heading="Create an account"
        subheading="Enter your email below to create your account"
      />
    </Suspense>
  )
}