import React from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { LogoIcon } from './Icons';
import { config } from "@/config"

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
  const handleCheckout = () => {
    // TODO: Implement Stripe checkout logic here
    console.log('Checkout button clicked');
  };

  return (
    <StyledButton
      onClick={handleCheckout}
      className={className}
      variant="default"
    >
      {showLogo && (
        <LogoWrapper>
          <LogoIcon />
        </LogoWrapper>
      )}
      {label}
    </StyledButton>
  );
};
