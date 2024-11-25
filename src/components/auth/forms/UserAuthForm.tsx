"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Icons } from "@/components/shared/icons/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GoogleSignIn } from "@/components/auth/providers/GoogleSignIn"
import { useAuth } from "@/lib/auth/hooks"
import { 
  loginSchema, 
  registerSchema, 
  type LoginSchema, 
  type RegisterSchema 
} from "@/lib/auth/schemas"
import { signIn, signUp } from "@/lib/auth"
import tw, { styled } from 'twin.macro'

// Styled components
const Container = styled.div`
  ${tw`grid gap-6`}
`;
const FormWrapper = styled.form`
  ${tw`space-y-4`}
`;
const ErrorMessage = styled.p`
  ${tw`text-sm text-red-500`}
`;
const SpinnerIcon = styled(Icons.spinner)`
  ${tw`mr-2 h-4 w-4 animate-spin`}
`;
const FullWidthButton = styled(Button)`
  ${tw`w-full`}
`;
const ResetPasswordText = styled.p`
  ${tw`px-8 text-center text-sm text-muted-foreground`}
`;
const StyledLink = styled(Link)`
  ${tw`underline underline-offset-4 hover:text-primary`}
`;
const Divider = styled.div`
  ${tw`relative`}
  
  &:before {
    ${tw`absolute inset-0 flex items-center`}
    content: "";
  }
`;
const DividerLine = styled.span`
  ${tw`w-full border-t`}
`;
const DividerText = styled.div`
  ${tw`relative flex justify-center text-xs uppercase`}
`;
const DividerBackground = styled.span`
  ${tw`bg-background px-2 text-muted-foreground`}
`;

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  type: 'login' | 'signup'
}

export function UserAuthForm({ type, ...props }: UserAuthFormProps) {
  const { handleAuthAction, isLoading, serverError } = useAuth({
    redirectTo: type === 'login' ? '/dashboard' : '/signup/confirmation'
  });

  const form = useForm<LoginSchema | RegisterSchema>({
    resolver: zodResolver(type === 'login' ? loginSchema : registerSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === 'signup' ? { passwordConfirm: "" } : {})
    },
  })

  async function onSubmit(data: LoginSchema | RegisterSchema) {
    const action = type === 'login' 
      ? () => signIn(data as LoginSchema)        
      : () => signUp(data as RegisterSchema);
      
    await handleAuthAction(action);
  }

  return (
    <Container {...props}>
      <Form {...form}>
        <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@example.com"
                    type="email"
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === 'signup' && (
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {serverError && (
            <ErrorMessage>{serverError}</ErrorMessage>
          )}
          <FullWidthButton type="submit" disabled={isLoading}>
            {isLoading && <SpinnerIcon />}
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </FullWidthButton>
        </FormWrapper>
      </Form>

      {type === 'login' && (
        <ResetPasswordText>
          Forgot password?{" "}
          <StyledLink href="/forgot-password">
            Reset my password
          </StyledLink>
        </ResetPasswordText>
      )}
      
      <Divider>
        <DividerLine />
        <DividerText>
          <DividerBackground>
            Or continue with
          </DividerBackground>
        </DividerText>
      </Divider>

      <GoogleSignIn />

      <ResetPasswordText>
        {type === 'login' 
          ? "Don't have an account? "
          : "Already have an account? "}
        <StyledLink href={type === 'login' ? "/signup" : "/login"}>
          {type === 'login' ? 'Sign Up' : 'Login'}
        </StyledLink>
      </ResetPasswordText>
    </Container>
  )
}