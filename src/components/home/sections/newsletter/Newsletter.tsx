"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import tw, { styled } from 'twin.macro';

const NewsletterSection = styled.section`
  ${tw``}
`;
const Divider = styled.hr`
  ${tw`w-11/12 mx-auto`}
`;
const Container = styled.div`
  ${tw`container py-24 sm:py-32`}
`;
const Title = styled.h3`
  ${tw`text-center text-4xl md:text-5xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-xl text-muted-foreground text-center mt-4 mb-8`}
`;
const Form = styled.form`
  ${tw`flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2`}
`;
const StyledInput = styled(Input)`
  ${tw`bg-muted/50 dark:bg-muted/80`}
`;

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!",
      });
      
      setEmail('');
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to subscribe',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewsletterSection id="newsletter">
      <Divider />

      <Container>
        <Title>
          Stay{" "}
          <GradientSpan>Updated</GradientSpan>
        </Title>
        <Description>
          Get the latest updates and news from me.
        </Description>

        <Form onSubmit={handleSubmit}>
          <StyledInput
            type="email"
            placeholder="name@gmail.com"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Button disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </Form>
      </Container>

      <Divider />
    </NewsletterSection>
  );
};