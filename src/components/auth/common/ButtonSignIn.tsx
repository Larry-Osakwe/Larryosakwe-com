'use client';

import React from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import type { AuthUser } from '@/lib/auth/types';

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

const StyledAvatarFallback = styled(AvatarFallback)`
  ${tw`font-medium text-secondary-foreground`}
`;

interface ButtonSignInProps {
  className?: string;
  route?: string;
}

export const ButtonSignIn: React.FC<ButtonSignInProps> = ({
  className,
  route = '/signup',
}) => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleClick = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push(route);
    }
  };

  const getDisplayName = () => {
    if (!user) return 'Sign In';
    return user.profile.name || user.email;
  };

  const getAvatarFallback = () => {
    if (!user?.email) return '';
    return user.email[0].toUpperCase();
  };

  return (
    <StyledButton
      onClick={handleClick}
      className={className}
      variant="default"
    >
      {user ? (
        <>
          <AvatarWrapper>
            <StyledAvatar>
              <AvatarImage 
                src={user.profile.image || undefined} 
                alt="User avatar" 
              />
              <StyledAvatarFallback>
                {getAvatarFallback()}
              </StyledAvatarFallback>
            </StyledAvatar>
          </AvatarWrapper>
          {getDisplayName()}
        </>
      ) : (
        'Sign In'
      )}
    </StyledButton>
  );
};

export default ButtonSignIn;