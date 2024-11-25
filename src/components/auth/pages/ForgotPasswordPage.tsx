"use client";

import { Suspense } from "react";
import { AuthCard } from "@/components/auth/common/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/forms/ForgotPasswordForm";
import tw, { styled } from 'twin.macro';

const PageContainer = styled.main`
  ${tw`flex justify-center items-center min-h-screen`}
`;

const LoadingFallback = styled.div`
  ${tw`flex justify-center items-center min-h-screen text-muted-foreground`}
`;

export function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
      <PageContainer>
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
      </PageContainer>
    </Suspense>
  );
}