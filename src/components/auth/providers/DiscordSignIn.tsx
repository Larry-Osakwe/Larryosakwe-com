"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export function DiscordSignIn() {
  const [isDiscordLoading, setIsDiscordLoading] = useState<boolean>(false);
  const supabase = createClient();

  async function signInWithDiscord() {
    setIsDiscordLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
          scopes: 'identify guilds.join', // Need guilds.join to add to server
        },
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Please try again.",
        description: "There was an error connecting with Discord.",
        variant: "destructive",
      });
      setIsDiscordLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signInWithDiscord}
      disabled={isDiscordLoading}
    >
      {isDiscordLoading ? (
        <Loader2 className="mr-2 size-4 animate-spin" />
      ) : (
        <Image
          src="https://authjs.dev/img/providers/discord.svg"
          alt="Discord logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}{" "}
      Join Discord Community
    </Button>
  );
}
