'use client'

import tw, { styled } from 'twin.macro';
import { Brain, Sparkles, Palette, CircleUser, CreditCard, Mail, Database, Search, ChartBar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Styled components
const Section = styled.section`
  ${tw`container px-4 py-24 sm:py-32 space-y-8`}
`;
const HeaderContainer = styled.div`
  ${tw`space-y-4 text-center`}
`;
const Title = styled.h2`
  ${tw`text-3xl lg:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-xl text-muted-foreground max-w-3xl mx-auto`}
`;
const TabsContainer = styled.div`
  ${tw`relative w-full flex justify-center`}
`;
const ScrollContainer = styled.div`
  ${tw`overflow-auto`}
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const StyledTabsList = styled(TabsList)`
  ${tw`inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground`}
`;
const StyledTabsTrigger = styled(TabsTrigger)`
  ${tw`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm min-w-[100px]`}
`;
const StyledCardTitle = styled(CardTitle)`
  ${tw`text-2xl`}
`;
const FeatureList = styled.ul`
  ${tw`space-y-2`}
`;
const FeatureItem = styled.li`
  ${tw`flex items-center gap-2`}
`;
const SparkleIcon = styled(Sparkles)`
  ${tw`w-4 h-4 text-primary`}
`;
const PoweredByContainer = styled.div`
  ${tw`flex items-center gap-2`}
`;
const PoweredByText = styled.span`
  ${tw`text-sm text-muted-foreground`}
`;

const features = {
  login: {
    icon: CircleUser,
    title: 'Login',
    description: 'User authentication',
    details: [
      'Email/Password',
      'Social Logins',
      'Email Verification',
      'Forgot/Reset Password',
      'Protected Routes'
    ],
    poweredBy: 'Supabase'
  },
  payments: {
    icon: CreditCard,
    title: 'Payments',
    description: 'Seamless payment processing',
    details: [
      'Stripe integration',
      'Subscription or one-time payments',
      'Checkout page',
      'Webhooks',
      'Set access based on subscription tier'
    ],
    poweredBy: 'Stripe'
  },
  email: {
    icon: Mail,
    title: 'Email',
    description: 'Powerful email capabilities',
    details: [
      'Transactional emails',
      'Email templates',
      'Custom domains',
      'DNS setup',
      'High deliverability'
    ],
    poweredBy: 'Resend'
  },
  database: {
    icon: Database,
    title: 'Database',
    description: 'Powerful database functionality',
    details: [
      'PostgreSQL database',
      'Real-time subscriptions',
      'Row level security',
      'Database backups',
      'Type-safe queries'
    ],
    poweredBy: 'Supabase'
  },
  seo: {
    icon: Search,
    title: 'SEO',
    description: 'Built-in search engine optimization',
    details: [
      'Meta tags management',
      'Dynamic OG images',
      'Sitemap generation',
      'Robots.txt configuration',
      'Structured data support'
    ],
    poweredBy: 'Next.js'
  },
  ai: {
    icon: Brain,
    title: 'AI Integration',
    description: 'Seamless AI capabilities built right in',
    details: [
      'AI-powered features',
      'OpenAI integration',
      'Intelligent responses',
      'Context-aware interactions',
      'Optimized performance'
    ],
    poweredBy: 'OpenAI'
  },
  design: {
    icon: Palette,
    title: 'Modern Design',
    description: 'Beautiful and responsive UI components',
    details: [
      'Dark/Light theme',
      'Customizable components',
      'Accessible design',
      'Modern aesthetics',
      'Consistent styling'
    ],
    poweredBy: 'Tailwind CSS'
  },
  analytics: {
    icon: ChartBar,
    title: 'Analytics',
    description: 'Comprehensive analytics',
    details: ['Real-time metrics', 'User behavior tracking', 'Customizable dashboards', 'Exportable data'],
    poweredBy: 'OpenPanel'
  }
}

export const Features = () => {
  return (
    <Section id="features">
      <HeaderContainer>
        <Title>
          Many{" "}
          <GradientSpan>Great Features</GradientSpan>
        </Title>
        <Description>
          Everything you need to build modern applications.
          Start with our production-ready template and focus on what matters - your product.
        </Description>
      </HeaderContainer>

      <Tabs defaultValue="login" className="w-full">
        <TabsContainer>
          <ScrollContainer>
            <StyledTabsList>
              {Object.entries(features).map(([key, feature]) => (
                <StyledTabsTrigger key={key} value={key}>
                  <feature.icon className="w-4 h-4 mr-2" />
                  <span>{feature.title}</span>
                </StyledTabsTrigger>
              ))}
            </StyledTabsList>
          </ScrollContainer>
        </TabsContainer>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <StyledCardTitle>{feature.title}</StyledCardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FeatureList>
                  {feature.details.map((detail, index) => (
                    <FeatureItem key={index}>
                      <SparkleIcon />
                      <span>{detail}</span>
                    </FeatureItem>
                  ))}
                </FeatureList>
                <PoweredByContainer>
                  <PoweredByText>Powered by</PoweredByText>
                  <Badge variant="secondary">{feature.poweredBy}</Badge>
                </PoweredByContainer>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}