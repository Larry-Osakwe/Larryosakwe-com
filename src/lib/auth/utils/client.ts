import { createClient } from "@/lib/supabase/supabaseClient";
import type { AuthUser } from "../types";

/**
 * Retrieves the currently authenticated user's data from the client side
 * 
 * This function:
 * 1. Gets the basic user data from Supabase Auth
 * 2. Fetches additional profile data from the profiles table
 * 3. Combines them into a unified user object
 * 
 * @returns AuthUser object if authenticated, null if not
 * 
 * @example
 * ```ts
 * const user = await getCurrentUser();
 * if (user) {
 *   console.log('Logged in as:', user.email);
 * }
 * ```
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access, name, image')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email || null,
    hasAccess: !!profile?.has_access,
    isAdmin: false,
    profile: {
      name: profile?.name || null,
      image: profile?.image || null
    }
  };
}