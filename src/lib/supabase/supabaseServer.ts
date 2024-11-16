import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient(useServiceRole = false) {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    useServiceRole ? process.env.SUPABASE_SERVICE_ROLE_KEY! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function getUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return user;
}

export async function isLoggedIn() {
  const user = await getUser();

  if (!user) throw new Error("Unauthorized");
}

export async function hasAccess() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_access')
    .eq('id', user.id)
    .single();

  return !!profile?.has_access;
}