import { protectPage } from "@/lib/auth/utils/protection";
import { createClient } from "@/lib/supabase/supabaseServer";
import tw, { styled } from 'twin.macro';

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

// Styled components
const Container = styled.div`
  ${tw`container mx-auto p-8`}
`;

const Title = styled.h1`
  ${tw`text-2xl font-bold mb-4`}
`;

const UserEmail = styled.p`
  ${tw`text-muted-foreground`}
`;

const HelpText = styled.p`
  ${tw`mt-4 text-sm text-muted-foreground`}
`;

const CodeBlock = styled.code`
  ${tw`text-primary`}
`;

export default async function DashboardPage() {
  // Authentication check - redirects to /login if not authenticated
  const user = await protectPage();
  
  // Initialize Supabase client for server-side data fetching
  const supabase = createClient();

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
    <Container>
      <Title>Welcome to your Dashboard</Title>
      <UserEmail>
        You are logged in as: {user.email}
      </UserEmail>
      <HelpText>
        Start building your dashboard by modifying:
        <br />
        <CodeBlock>src/app/dashboard/page.tsx</CodeBlock>
      </HelpText>
      <HelpText>
        Add server-side data fetching using Supabase queries in this file.
        <br />
        Create client components for interactive features.
      </HelpText>
    </Container>
  );
}
