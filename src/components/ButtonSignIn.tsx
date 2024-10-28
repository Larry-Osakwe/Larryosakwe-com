'use client';

import React from 'react';
import tw, { styled } from 'twin.macro';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/supabase/supabaseClient';

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

interface ButtonSignInProps {
  className?: string;
  route?: string;
}

export const ButtonSignIn: React.FC<ButtonSignInProps> = ({
  className,
  route = '/signup',
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then(setUser);
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
    const metadata = user.user_metadata;
    return metadata?.name || metadata?.full_name || user.email;
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
                src={user.user_metadata.avatar_url || user.user_metadata.picture} 
                alt="User avatar" 
              />
              <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
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
