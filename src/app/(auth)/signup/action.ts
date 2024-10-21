import { createClient } from "@/lib/supabase/supabaseServer";

export const registerUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
  
    // supabase authentication from here
    const supabase = createClient();
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return {
        error: true,
        message: "Email already in use",
      };
    }
  
    // User successfully created
    return {
      success: true,
      message: "Check your email for the confirmation link",
    };
  };