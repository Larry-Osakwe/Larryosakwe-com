import { createClient } from "@/lib/supabase/supabaseServer";
import type { AuthUser } from "../types";

/**
 * Server-side authentication check
 * 
 * Verifies user authentication and fetches complete user profile
 * Throws error if user is not authenticated
 * 
 * @throws Error if user is not authenticated
 * @returns Complete user profile with auth and database data
 * 
 * @example
 * ```ts
 * try {
 *   const user = await requireAuth();
 *   // User is authenticated
 * } catch (error) {
 *   // Handle unauthenticated user
 * }
 * ```
 */
export async function requireAuth(): Promise<AuthUser> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Fetch additional profile data including access and admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access, is_admin, name, image')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email || null,
    hasAccess: !!profile?.has_access,
    isAdmin: !!profile?.is_admin,
    profile: {
      name: profile?.name || null,
      image: profile?.image || null
    }
  };
}

/**
 * Server-side paid access verification
 * 
 * Verifies both authentication and subscription status
 * Throws error if user is not authenticated or doesn't have paid access
 * 
 * @throws Error if user is not authenticated or lacks paid access
 * @returns Complete user profile
 * 
 * @example
 * ```ts
 * try {
 *   const user = await requirePaidUser();
 *   // User is authenticated and has paid access
 * } catch (error) {
 *   // Handle unauthorized access
 * }
 * ```
 */
export async function requirePaidUser(): Promise<AuthUser> {
  const user = await requireAuth();

  if (!user.hasAccess) {
    throw new Error('Subscription required');
  }

  return user;
}