
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import React from "react";

export default function RegistrationConfirmation() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-[540px] text-center bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Mail className="h-16 w-16 text-primary" />
          </div>
          <p className="text-muted-foreground mb-4">
            We&apos;ve sent a confirmation link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>
          <p className="text-muted-foreground text-sm">
            If you don&apos;t see the email, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}