"use client";

import { Suspense } from "react";
import { AuthCard } from "../common/AuthCard";
import { ResetPasswordForm } from "../forms";

export function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex justify-center items-center min-h-screen">
        <AuthCard 
          title="Password Reset"
          description="Enter your new password to update your password"
        >
          <ResetPasswordForm />
        </AuthCard>
      </main>
    </Suspense>
  );
}