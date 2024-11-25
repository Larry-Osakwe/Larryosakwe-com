"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import tw, { styled } from 'twin.macro';

const LoaderIcon = styled(Loader2)`
  ${tw`mr-2 size-4 animate-spin`}
`;

const ProviderIcon = styled(Image)`
  ${tw`mr-2`}
`;

const SignInButton = styled(Button)`
  ${tw`w-full`}
`;

export function GithubSignIn() {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithGithub() {
    setIsGithubLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
          queryParams: {
            prompt: 'consent',     // Force GitHub to show account selection
            login: ''             // Empty string to clear existing session
          }
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Please try again.",
        description: "There was an error logging in with Github.",
        variant: "destructive",
      });
      setIsGithubLoading(false);
    }
  }

  return (
    <SignInButton
      type="button"
      variant="outline"
      onClick={signInWithGithub}
      disabled={isGithubLoading}
    >
      {isGithubLoading ? (
        <LoaderIcon />
      ) : (
        <ProviderIcon
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          width={20}
          height={20}
        />
      )}{" "}
      Connect GitHub Account
    </SignInButton>
  );
}