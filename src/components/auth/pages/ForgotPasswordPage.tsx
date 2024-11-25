"use client";

import { Suspense } from "react";
import { AuthCard } from "@/components/auth/common/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/forms/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex justify-center items-center min-h-screen">
        <AuthCard 
          title="Password Reset"
          description="Enter your email address to reset your password"
          footerLinks={[
            { text: "Remember your password?", href: "/login", linkText: "Login" },
            { text: "Don't have an account?", href: "/signup", linkText: "Sign Up" }
          ]}
        >
          <ForgotPasswordForm />
        </AuthCard>
      </main>
    </Suspense>
  );
}