import { Metadata } from "next"
import { UserAuthForm } from "@/components/UserAuthForm"
import { AuthLayout } from "@/components/AuthLayout"
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/supabaseServer";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (user && !error) {
    redirect("/dashboard");
  }

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
