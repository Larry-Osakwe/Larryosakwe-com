import React from 'react';
import { Button } from '@/components/ui/button';
import { LogoIcon } from './Icons';
import { config } from '../../config';

// Configure the checkout button
const checkoutButtonConfig = {
  label: `Get ${config.appName}`,
  showLogo: true,
};

interface CheckoutButtonProps {
  label?: string;
  showLogo?: boolean;
  className?: string;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  label = checkoutButtonConfig.label,
  showLogo = checkoutButtonConfig.showLogo,
  className,
}) => {
  const handleCheckout = () => {
    // TODO: Implement Stripe checkout logic here
    console.log('Checkout button clicked');
  };

  return (
    <Button
      onClick={handleCheckout}
      className={className}
      variant="default"
    >
      {showLogo && <LogoIcon className="w-4 h-4 mr-2" />}
      {label}
    </Button>
  );
};
