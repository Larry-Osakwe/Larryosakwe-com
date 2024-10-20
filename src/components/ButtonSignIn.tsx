'use client';

import React from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';

// Note: This component uses twin.macro for styling. 
// To customize styles, modify the tw`` template literals in the styled components section.
// For more information on twin.macro, visit: https://github.com/ben-rogerson/twin.macro

// Styled components using twin.macro
const StyledButton = styled(Button)`
  ${tw`flex items-center justify-center`}
  // Add any additional custom styles here
`;

const AvatarWrapper = styled.span`
  ${tw`w-6 h-6 mr-2 flex items-center justify-center`}
  // Customize the avatar wrapper styles here
`;

const StyledAvatar = styled(Avatar)`
  ${tw`w-full h-full`}
`;

// Configure the sign-in button
// TODO: Customize the sign-in button configuration as needed
const signInButtonConfig = {
  label: 'Sign In',
  showAvatar: false,
  route: '/login',
};

interface ButtonSignInProps {
  label?: string;
  showAvatar?: boolean;
  className?: string;
  route?: string;
}

export const ButtonSignIn: React.FC<ButtonSignInProps> = ({
  label = signInButtonConfig.label,
  showAvatar = signInButtonConfig.showAvatar,
  className,
  route = signInButtonConfig.route,
}) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push(route);
  };

  return (
    <StyledButton
      onClick={handleSignIn}
      className={className}
      variant="default"
    >
      {showAvatar && (
        <AvatarWrapper>
          <StyledAvatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </StyledAvatar>
        </AvatarWrapper>
      )}
      {label}
    </StyledButton>
  );
};

export default ButtonSignIn;
