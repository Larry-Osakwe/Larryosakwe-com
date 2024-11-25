'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import type { AuthResponse } from '../types';

interface UseAuthOptions {
  redirectTo?: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export function useAuth({
  redirectTo,
  onError,
  onSuccess
}: UseAuthOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthAction = async (
    action: () => Promise<AuthResponse>
  ) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const response = await action();

      if (response.error) {
        setServerError(response.message);
        onError?.(response.message);
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        onSuccess?.();
        if (response.message) {
          toast({
            title: "Success",
            description: response.message,
          });
        }
        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    } catch (error) {
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