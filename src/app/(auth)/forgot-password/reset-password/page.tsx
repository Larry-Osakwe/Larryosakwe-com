"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { resetPassword } from "../../actions";

export default function ResetPassword() {

    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const form = useForm({
        defaultValues: {
        password: '',
        passwordConfirm: '',
        },
    });
    
    const handleSubmit = async (data: { password: string}) => {
        setServerError(null);
        setIsLoading(true); // Set loading to true when submission starts
    
        try {
          const response = await resetPassword({
            password: data.password,
            code: code || '',
          });
    
          if (response.error) {
            setServerError(response.message);
          } else {
            console.log("ddd: ", response);
            // Redirect to the confirmation page
            router.push("/dashboard");
          }
        } catch (error) {
          setServerError("An unexpected error occurred. Please try again.");
        } finally {
          setIsLoading(false); // Set loading to false when submission ends
        }
      };

    return (
        <main className="flex justify-center items-center min-h-screen">
          <Card className="w-[380px]">
            <CardHeader>
              <CardTitle>Password Reset</CardTitle>
              <CardDescription>
                Enter your new password to update your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
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
                        <FormLabel>Password confirm</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {serverError && (
                    <p className="text-red-500 text-sm mt-2">{serverError}</p>
                  )}
                  {/* <Button type="submit">Register</Button> */}
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      );
}
