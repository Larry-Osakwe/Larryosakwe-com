"use client";

import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { LogoIcon } from './Icons';
import { config } from "@/config";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Note: This component uses twin.macro for styling. 
// To customize styles, modify the tw`` template literals in the styled components section.
// For more information on twin.macro, visit: https://github.com/ben-rogerson/twin.macro

// Styled components using twin.macro
// You can customize these styles by modifying the tw`` template literals
const StyledButton = styled(Button)`
  ${tw`flex items-center justify-center`}
  // Add any additional custom styles here
`;

const LogoWrapper = styled.span`
  ${tw`w-6 h-6 mr-2`}
  // Customize the logo wrapper styles here
`;

// Configure the checkout button
// TODO: Customize the checkout button configuration as needed
const checkoutButtonConfig = {
  label: `Get ${config.appName}`,
  showLogo: true,
};

interface ButtonCheckoutProps {
  label?: string;
  showLogo?: boolean;
  className?: string;
}

export const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({
  label = checkoutButtonConfig.label,
  showLogo = checkoutButtonConfig.showLogo,
  className,
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
    <StyledButton
      onClick={handleCheckout}
      className={className}
      variant="default"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : showLogo && (
        <LogoWrapper>
          <LogoIcon />
        </LogoWrapper>
      )}
      {isLoading ? "Loading..." : label}
    </StyledButton>
  );
};
