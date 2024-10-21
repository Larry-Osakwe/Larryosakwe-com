import { Metadata } from "next"
import { UserAuthForm } from "@/components/UserAuthForm"
import { AuthLayout } from "@/components/AuthLayout"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
}

export default function SignupPage() {
  return (
    <AuthLayout
      heading="Create an account"
      subheading="Enter your email below to create your account"
      showImage={true} // Set this to false to hide the image
    >
      <UserAuthForm type="signup" />
    </AuthLayout>
  )
}
