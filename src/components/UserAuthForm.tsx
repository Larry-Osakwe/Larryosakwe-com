"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerUser } from "@/app/(auth)/actions"
import { loginUser } from "@/app/(auth)/actions"
import GoogleSignIn from "@/components/GoogleSignIn"

// Define the form schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {
  type: 'login' | 'signup'
}

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [serverError, setServerError] = React.useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setServerError(null)

    try {
      if (type === 'signup') {
        const result = await registerUser(data)
        
        if (result.error) {
          setServerError(result.message)
        } else {
          router.push('/signup/confirmation')
        }
      } else {
        const result = await loginUser(data)
        
        if (result?.error) {
          setServerError(result.message)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setServerError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      {type === 'login' && (
        <p className="px-8 text-center text-sm text-muted-foreground">
          Forgot password?{" "}
          <Link
            href="/forgot-password"
            className="underline underline-offset-4 hover:text-primary"
          >
            Reset my password
          </Link>
        </p>
      )}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignIn />
      <p className="px-8 text-center text-sm text-muted-foreground">
        {type === 'login' 
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          href={type === 'login' ? "/signup" : "/login"}
          className="underline underline-offset-4 hover:text-primary"
        >
          {type === 'login' ? 'Sign Up' : 'Login'}
        </Link>
      </p>
    </div>
  )
}
