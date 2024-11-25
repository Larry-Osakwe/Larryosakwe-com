"use client";

import { Suspense } from "react";
import { AuthCard } from "../common/AuthCard";
import { ResetPasswordForm } from "../forms";
import tw, { styled } from 'twin.macro';

const PageContainer = styled.main`
  ${tw`flex justify-center items-center min-h-screen`}
`;

const LoadingFallback = styled.div`
  ${tw`flex justify-center items-center min-h-screen text-muted-foreground`}
`;

export function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
      <PageContainer>
        <AuthCard 
          title="Password Reset"
          description="Enter your new password to update your password"
        >
          <ResetPasswordForm />
        </AuthCard>
      </PageContainer>
    </Suspense>
  );
}