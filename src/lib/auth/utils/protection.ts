import { redirect } from 'next/navigation';
import { requireAuth } from './server';
import { notFound } from 'next/navigation';

/**
 * Protects a page from unauthenticated access
 * 
 * Use this for pages that require a user to be logged in
 * Redirects to login page if user is not authenticated
 * 
 * @example
 * ```ts
 * // In your page.tsx
 * export default async function ProtectedPage() {
 *   const user = await protectPage();
 *   return <div>Welcome {user.email}</div>;
 * }
 * ```
 */
export async function protectPage() {
  try {
    return await requireAuth();
  } catch (error) {
    redirect('/login');
  }
}

/**
 * Protects a page that requires a paid subscription
 * 
 * Use this for premium content pages
 * - Redirects to login if not authenticated
 * - Redirects to pricing if authenticated but no subscription
 * - Allows access to admins regardless of subscription
 * 
 * @example
 * ```ts
 * // In your premium-page.tsx
 * export default async function PremiumPage() {
 *   const user = await protectPaidPage();
 *   return <div>Premium content</div>;
 * }
 * ```
 */
export async function protectPaidPage() {
  try {
    const user = await requireAuth();

    if (!user.hasAccess && !user.isAdmin) {  // Admin bypass
      redirect('/pricing');
    }

    return user;
  } catch (error) {
    redirect('/login');
  }
}

/**
 * Protects admin-only pages
 * 
 * Use this for administrative pages
 * - Redirects to login if not authenticated
 * - Shows 404 if authenticated but not an admin
 * 
 * @example
 * ```ts
 * // In your admin-page.tsx
 * export default async function AdminPage() {
 *   const user = await protectAdminPage();
 *   return <div>Admin Dashboard</div>;
 * }
 * ```
 */
export async function protectAdminPage() {
  try {
    const user = await requireAuth();

    if (!user.isAdmin) {
      notFound();  // Return 404 for security
    }

    return user;
  } catch (error) {
    redirect('/login');
  }
}