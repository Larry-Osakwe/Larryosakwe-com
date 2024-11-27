import { protectPage } from "@/lib/auth/utils/protection";
import { createClient } from "@/lib/supabase/supabaseServer";

/**
 * Dashboard Page - Server Component
 * 
 * This is a protected server component that demonstrates:
 * 1. Route protection using protectPage utility
 * 2. Server-side data fetching with Supabase
 * 3. Type-safe database queries
 * 
 * Key features:
 * - Uses protectPage() for authentication check
 * - Automatically redirects to /login if not authenticated
 * - Can fetch data server-side for better performance
 * - Supports real-time updates (through client components)
 * 
 * @example
 * // Example of fetching user-specific data:
 * const { data: userProfile } = await supabase
 *   .from('profiles')
 *   .select('*')
 *   .eq('id', user.id)
 *   .single();
 */

export default async function DashboardPage() {
  // Authentication check - redirects to /login if not authenticated
  // const user = await protectPage();
  
  // Initialize Supabase client for server-side data fetching
  // const supabase = createClient();

  /**
   * Example of server-side data fetching
   * Uncomment and modify based on your database schema
   * 
   * const { data: profile } = await supabase
   *   .from('profiles')
   *   .select(`
   *     id,
   *     full_name,
   *     avatar_url,
   *     subscription_status,
   *     created_at
   *   `)
   *   .eq('id', user.id)
   *   .single();
   */

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-muted-foreground">
        {/* You are logged in as: {user.email} */}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Start building your dashboard by modifying:
        <br />
        <code className="text-primary">src/app/dashboard/page.tsx</code>
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Add server-side data fetching using Supabase queries in this file.
        <br />
        Create client components for interactive features.
      </p>
    </div>
  );
}
