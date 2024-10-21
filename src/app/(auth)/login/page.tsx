import { Metadata } from "next"
import { UserAuthForm } from "@/components/UserAuthForm"
import { AuthLayout } from "@/components/AuthLayout"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Enter your credentials to access your account"
      showImage={true} // Set this to false to hide the image
    >
      <UserAuthForm type="login" />
    </AuthLayout>
  )
}
