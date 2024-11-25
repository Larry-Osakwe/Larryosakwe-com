'use client'

import { Brain, Sparkles, Palette, CircleUser, CreditCard, Mail, Database, Search, ChartBar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'

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
    <section id="features" className="container px-4 py-24 sm:py-32 space-y-8">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold">
          Many{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Great Features
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to build modern applications. 
          Start with our production-ready template and focus on what matters - your product.
        </p>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <div className="relative w-full flex justify-center">
          <div className="overflow-auto scrollbar-hide">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
              {Object.entries(features).map(([key, feature]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                    "min-w-[100px]"
                  )}
                >
                  <feature.icon className="w-4 h-4 mr-2" />
                  <span>{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Powered by</span>
                  <Badge variant="secondary">{feature.poweredBy}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}