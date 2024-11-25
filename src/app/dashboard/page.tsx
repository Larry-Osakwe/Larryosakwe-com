import { protectPage } from "@/lib/auth/utils/protection";
import { createClient } from "@/lib/supabase/supabaseServer";

/**
 * Dashboard Page Component
 * 
 * This is a server component that demonstrates:
 * 1. Authentication protection
 * 2. Server-side data fetching
 * 3. Integration with Supabase
 * 
 * You can:
 * 1. Add your own dashboard UI components
 * 2. Fetch additional data from Supabase or other sources
 * 3. Implement real-time subscriptions
 * 4. Add more protected routes following this pattern
 * 
 * @example
 * // Fetch user's data from Supabase
 * const { data } = await supabase
 *   .from('your_table')
 *   .select('*')
 *   .eq('user_id', user.id);
 */
export default async function DashboardPage() {
  // Protect this page - redirects to login if not authenticated
  const user = await protectPage();
  
  // Initialize Supabase client
  const supabase = createClient();

  // Example of server-side data fetching
  // Uncomment and modify as needed:
  /*
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  */

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to your Dashboard
      </h1>
      <p className="text-muted-foreground">
        This is a protected page. You are logged in as: {user.email}
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Start building your dashboard by modifying this page in:
        <br />
        <code className="text-primary">src/app/dashboard/page.tsx</code>
      </p>
    </div>
  );
}
