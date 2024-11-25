import { Metadata } from "next"
import { UserAuthForm } from "@/components/auth/forms"
import { AuthLayout } from "@/components/auth/common"
import { Suspense } from "react"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getSEOTags } from "@/lib/seo/seo"

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
      <AuthLayout
        heading="Create an account"
        subheading="Enter your email below to create your account"
        showImage={true}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <UserAuthForm type="signup" />
        </Suspense>
      </AuthLayout>
    </Suspense>
  )
}