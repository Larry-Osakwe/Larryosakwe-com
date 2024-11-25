"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/hooks";
import { resetPassword } from "@/lib/auth";
import { z } from "zod";
import { passwordSchema } from "@/lib/auth/schemas";
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

const resetPasswordSchema = z.object({
  password: passwordSchema,
  passwordConfirm: passwordSchema
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const { handleAuthAction, isLoading, serverError } = useAuth({
    redirectTo: "/dashboard"
  });

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    await handleAuthAction(() => resetPassword({ 
      password: data.password 
    }));
  };

  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password"
                  placeholder="Enter new password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="password"
                  placeholder="Confirm new password"
                  autoCapitalize="none"
                  autoComplete="new-password"
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