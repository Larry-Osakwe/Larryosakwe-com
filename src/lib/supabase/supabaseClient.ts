import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isLoggedIn() {
  const user = await getUser();
  return !!user;
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