"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export const resetPasswordFunc = async ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => {

  // supabase authentication from here
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  console.log("data : ", data);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully created
  return {
    success: true,
    message: "Password reset successful",
  };
};