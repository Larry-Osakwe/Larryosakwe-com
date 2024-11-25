import { ReactNode } from "react";
import Link from "next/link";
import tw, { styled } from 'twin.macro';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Extend shadcn components with twin.macro
const StyledCard = styled(Card)`
  ${tw`w-[380px]`}
`;
const StyledLink = styled(Link)`
  ${tw`underline hover:text-primary transition-colors`}
`;
const FooterText = styled.div`
  ${tw`text-sm text-muted-foreground`}
`;
const StyledFooter = styled(CardFooter)`
  ${tw`flex flex-col gap-2`}
`;

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description: string;
  footerLinks?: Array<{
    text: string;
    href: string;
    linkText: string;
  }>;
}

export function AuthCard({ children, title, description, footerLinks }: AuthCardProps) {
  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footerLinks && (
        <StyledFooter>
          {footerLinks.map((link, index) => (
            <FooterText key={index}>
              {link.text}{" "}
              <StyledLink href={link.href}>
                {link.linkText}
              </StyledLink>
            </FooterText>
          ))}
        </StyledFooter>
      )}
    </StyledCard>
  );
}