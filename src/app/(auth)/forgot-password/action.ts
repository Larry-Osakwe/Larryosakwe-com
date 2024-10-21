"use server";


import { createClient } from "@/lib/supabase/supabaseServer";
import { updateSession } from "@/lib/supabase/supabaseMiddleware";


export const forgotPassword = async ({ email }: { email: string }) => {
  // supabase authentication from here
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  console.log("err: ", error);
  // if (error === null) {
  //   return {
  //     error: true,
  //     message: "No such email registered",
  //   };
  // }

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully found
  return {
    success: true,
    message:
      "If an account exists, a password reset email has been sent. Please check your inbox.",
  };
};