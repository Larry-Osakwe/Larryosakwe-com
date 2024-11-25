"use client";

import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/shared/icons/Icons';
import { config } from "@/config";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CheckoutMode } from '@/types/config/stripe';

// Styled components
const CheckoutButton = styled(Button)`
  ${tw`flex items-center justify-center`}
`;

const LoaderIcon = styled(Loader2)`
  ${tw`mr-2 h-4 w-4 animate-spin`}
`;

const LogoWrapper = styled.span`
  ${tw`mr-2 h-6 w-6`}
`;

// Default configuration
const defaultConfig = {
  label: `Get ${config.appName}`,
  showLogo: true,
};

interface ButtonCheckoutProps {
  label?: string;
  showLogo?: boolean;
  className?: string;
  priceId: string;
  mode: CheckoutMode;
}

export const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({
  label = defaultConfig.label,
  showLogo = defaultConfig.showLogo,
  className,
  priceId,
  mode,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, mode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutButton
      onClick={handleCheckout}
      className={className}
      variant="default"
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderIcon />
      ) : showLogo && (
        <LogoWrapper>
          <LogoIcon />
        </LogoWrapper>
      )}
      {isLoading ? "Loading..." : label}
    </CheckoutButton>
  );
};
