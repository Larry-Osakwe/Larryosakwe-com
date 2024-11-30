"use client";

import { AuthLayout } from "./AuthLayout";
import { UserAuthForm } from "../forms/UserAuthForm";

interface AuthFormWrapperProps {
  type: 'login' | 'signup';
  heading: string;
  subheading: string;
}

export function AuthFormWrapper({ type, heading, subheading }: AuthFormWrapperProps) {
  return (
    <AuthLayout
      heading={heading}
      subheading={subheading}
      showImage={true}
    >
      <UserAuthForm type={type} />
    </AuthLayout>
  );
} 