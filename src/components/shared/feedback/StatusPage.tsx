"use client";

import tw, { styled } from 'twin.macro';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

// Styled components
const PageContainer = styled.main`
  ${tw`flex justify-center items-center min-h-screen bg-background`}
`;
const StatusCard = styled(Card)`
  ${tw`w-[540px] text-center bg-secondary`}
`;
const IconContainer = styled.div`
  ${tw`flex justify-center mb-6`}
`;
const MailIcon = styled(Mail)`
  ${tw`h-16 w-16 text-primary`}
`;
const Message = styled.p`
  ${tw`text-muted-foreground mb-4`}
`;
const SpamNote = styled.p`
  ${tw`text-muted-foreground text-sm`}
`;

interface StatusPageProps {
  title: string;
  message: string;
}

export function StatusPage({ title, message }: StatusPageProps) {
  return (
    <PageContainer>
      <StatusCard>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <IconContainer>
            <MailIcon />
          </IconContainer>
          <Message>{message}</Message>
          <SpamNote>
            If you don't see the email, please check your spam folder.
          </SpamNote>
        </CardContent>
      </StatusCard>
    </PageContainer>
  );
}
