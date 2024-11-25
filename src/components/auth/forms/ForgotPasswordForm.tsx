// /components/auth/forms/ForgotPasswordForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/hooks";
import { forgotPassword } from "@/lib/auth";
import { emailSchema, type LoginSchema } from "@/lib/auth/schemas";
import tw, { styled } from 'twin.macro';

// Styled components
const FormContainer = styled.form`
  ${tw`flex flex-col gap-2`}
`;
const ErrorMessage = styled.p`
  ${tw`text-red-500 text-sm mt-2`}
`;
const LoaderIcon = styled(Loader2)`
  ${tw`mr-2 h-4 w-4 animate-spin`}
`;

export function ForgotPasswordForm() {
  const { handleAuthAction, isLoading, serverError } = useAuth({
    redirectTo: "/forgot-password/confirmation"
  });
  
  const form = useForm<Pick<LoginSchema, 'email'>>({
    resolver: zodResolver(
      emailSchema
    ),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: Pick<LoginSchema, 'email'>) => {
    await handleAuthAction(() => forgotPassword(data));
  };

  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <ErrorMessage>{serverError}</ErrorMessage>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoaderIcon />
              Please wait
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </FormContainer>
    </Form>
  );
}