"use server";

import { createClient } from "@/lib/supabase/supabaseServer";

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {

  // supabase authentication from here
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (!data.user) {
    return {
      error: true,
      message: "Login failed. Please try again.",
    };
  }

  // User successfully logged in
  return {
    success: true,
    message: "Login successful",
    user: {
      id: data.user.id,
      email: data.user.email,
      // Add any other user data you want to return
    },
  };
};