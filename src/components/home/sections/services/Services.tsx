import tw, { styled } from 'twin.macro';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound, Wallet, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';

const Section = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const Grid = styled.div`
  ${tw`grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center`}
`;
const ContentColumn = styled.div`
  ${tw`flex flex-col gap-8`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-muted-foreground text-xl mt-4 mb-4`}
`;
const IconWrapper = styled.div`
  ${tw`mt-1 bg-primary/20 p-1 rounded-2xl`}
`;
const ServiceImage = styled(Image)`
  ${tw`object-contain rounded-lg`}
`;
const CTAWrapper = styled.div`
  ${tw`mt-12 flex flex-col sm:flex-row items-center gap-4`}
`;

interface ServiceProps {
  title: string;
  description: string;
  icon?: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Authentication",
    description:
      "Secure and easy authentication with Supabase. Google OAuth, Email/Password, and more.",
    icon: <KeyRound />,
  },
  {
    title: "Payment Processing",
    description:
      "Secure and easy payment processing with Stripe. One-time payments, subscriptions, and more.",
    icon: <Wallet />,
  },
  {
    title: "And More",
    description:
      "Analytics, Email, Google Scheduling, Extensive component library, and more.",
    icon: <Sparkles />,
  },
];

export const Services = () => {
  return (
    <Section id="flarestack">
      <Grid>
        <div>
          <Title>
            <GradientSpan>FlareStack </GradientSpan>
            Boilerplate
          </Title>

          <Description>
            The best Next.js boilerplate for your next project. Get your own site up and running in minutes. This site is built with FlareStack Boilerplate.
          </Description>

          <ContentColumn>
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <IconWrapper>{icon}</IconWrapper>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </ContentColumn>

          <CTAWrapper>
            <Link href="https://flarestack.io" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90">
                Get Started
              </Button>
            </Link>
            <Link href="https://flarestack.io/docs" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                View Documentation
              </Button>
            </Link>
          </CTAWrapper>
        </div>
        <ServiceImage
          src="/services-image.png"
          alt="background"
          width={500}
          height={400}
        />
      </Grid>
    </Section>
  );
};