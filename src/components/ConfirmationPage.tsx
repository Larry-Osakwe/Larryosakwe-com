import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import React from "react";

interface ConfirmationPageProps {
  title: string;
  message: string;
}

export function ConfirmationPage({ title, message }: ConfirmationPageProps) {
  return (
    <main className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-[540px] text-center bg-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6">
            <Mail className="h-16 w-16 text-primary" />
          </div>
          <p className="text-muted-foreground mb-4">{message}</p>
          <p className="text-muted-foreground text-sm">
            If you don't see the email, please check your spam folder.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
