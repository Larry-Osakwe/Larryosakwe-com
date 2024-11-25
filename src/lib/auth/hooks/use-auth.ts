'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import type { AuthResponse } from '../types';

/**
 * Configuration options for the useAuth hook
 * @param redirectTo - URL to redirect to after successful authentication
 * @param onError - Callback function when authentication fails
 * @param onSuccess - Callback function when authentication succeeds
 */
interface UseAuthOptions {
  redirectTo?: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

/**
 * Custom hook for handling authentication actions
 * 
 * Provides:
 * - Loading state management
 * - Error handling
 * - Success notifications
 * - Automatic redirects
 * - Toast notifications
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { handleAuthAction, isLoading } = useAuth({
 *   redirectTo: '/dashboard'
 * });
 * 
 * // Handle login
 * const onSubmit = () => {
 *   handleAuthAction(() => signIn({ email, password }));
 * };
 * 
 * // With custom callbacks
 * const { handleAuthAction } = useAuth({
 *   onSuccess: () => console.log('Success!'),
 *   onError: (error) => console.error(error)
 * });
 * ```
 */
export function useAuth({
  redirectTo,
  onError,
  onSuccess
}: UseAuthOptions = {}) {
  // Track loading state during authentication
  const [isLoading, setIsLoading] = useState(false);
  // Store server-side error messages
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Generic handler for authentication actions
   * 
   * Manages the entire authentication flow:
   * 1. Sets loading state
   * 2. Executes the authentication action
   * 3. Handles success/error responses
   * 4. Shows appropriate notifications
   * 5. Triggers callbacks
   * 6. Handles redirects
   * 
   * @param action - Async function that returns an AuthResponse
   */
  const handleAuthAction = async (
    action: () => Promise<AuthResponse>
  ) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await action();

      if (response.error) {
        // Handle error response
        setServerError(response.message);
        onError?.(response.message);
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        // Handle successful response
        onSuccess?.();
        if (response.message) {
          toast({
            title: "Success",
            description: response.message,
          });
        }
        // Redirect if URL is provided
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    } catch (error) {
      // Handle unexpected errors
      const message = "An unexpected error occurred";
      setServerError(message);
      onError?.(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    serverError,
    handleAuthAction,
  };
}