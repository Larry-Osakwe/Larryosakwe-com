import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Sparkles, Zap } from 'lucide-react'
import { useState } from "react"
import { config } from "@/config"
import { cn } from "@/lib/utils"
import { Dialog, DialogDescription, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import Link from "next/link"

export const Pricing = () => {
  const [plan, setPlan] = useState<"standard" | "pro">("standard")

  const standardPlan = config.stripe.plans[0]
  const proPlan = config.stripe.plans[1]

  const currentPlan = plan === "standard" ? standardPlan : proPlan

  const AffiliateCard = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card border-border rounded-xl hover:bg-muted transition-colors cursor-pointer">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">Refer a founder & earn</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Know someone who needs ongoing development? Get 5% monthly commission.
            </p>
            <ArrowRight className="text-secondary" />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Coming Soon to FlareLabs</DialogTitle>
          <DialogDescription>
            The affiliate program will be available when FlareLabs launches. Want to be notified?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            FlareLabs is launching soon with a full affiliate program. Early supporters will get:
            <ul className="list-disc list-inside mt-2">
              <li>Priority access to the affiliate program</li>
              <li>5% commission on all referrals</li>
              <li>Early access to new features</li>
            </ul>
          </p>
          <Button asChild>
            <Link href="#newsletter">Join the waitlist</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="container mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Want your <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">MVP</span> built for you?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Skip the hassle of building from scratch. Get a dedicated full-stack developer working on your product.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto items-stretch">
        {/* Left Panel */}
        <Card className="flex-1 bg-background text-foreground rounded-3xl overflow-hidden relative">
          <CardContent className="p-8">
            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-2xl opacity-50" />

            <Badge variant="secondary" className="bg-gradient-to-r from-secondary to-primary text-secondary-foreground hover:from-secondary/90 hover:to-primary/90 mb-6">
              Limited spots available
            </Badge>

            <h2 className="text-5xl font-bold mb-12">
              Let's Build
              <br />
              Together
            </h2>

            <div className="space-y-6">
              <a
                href={config.scheduler.defaultConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="bg-card border-border rounded-xl hover:bg-muted transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Book a 15-min intro call</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Learn how I can help turn your ideas into production-ready features.
                    </p>
                    <div className="flex items-center gap-2 text-secondary">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">View available times</span>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </a>

              {/* <Card className="bg-card border-border rounded-xl hover:bg-muted transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Refer a founder & earn</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Know someone who needs ongoing development? Get 5% monthly commission.
                  </p>
                  <ArrowRight className="text-secondary" />
                </CardContent>
              </Card> */}
              {/* <ComingSoonDialog /> */}
              <AffiliateCard />
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="flex-1 p-8">
          <h2 className="text-4xl font-bold mb-8">Subscription Plans</h2>

          <Tabs defaultValue="standard" className="mb-8" onValueChange={(value) => setPlan(value as "standard" | "pro")}>
            <TabsList className="bg-muted p-1 rounded-full">
              <TabsTrigger
                value="standard"
                className="rounded-full px-6 data-[state=active]:bg-background"
              >
                Standard
              </TabsTrigger>
              <TabsTrigger
                value="pro"
                className={cn(
                  "rounded-full px-6 data-[state=active]:bg-background group relative",
                  proPlan.isFeatured && "data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/20 data-[state=active]:to-primary/20"
                )}
              >
                <Zap className="w-4 h-4 mr-1" />
                Pro
                {proPlan.isFeatured && (
                  <Sparkles className="w-4 h-4 ml-1.5 text-secondary hidden group-data-[state=active]:block" />
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-8">
            <div className="flex items-baseline gap-1 mb-2">
              <span className={cn(
                "text-5xl font-bold",
                currentPlan.isFeatured
                  ? "bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                  : "text-foreground"
              )}>
                ${currentPlan.price.toLocaleString()}
              </span>
              <span className="text-muted-foreground">/m</span>
            </div>
            <p className="text-muted-foreground">{currentPlan.description}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">What's included</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPlan.features.map(({ name }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className={cn(
                    "w-1 h-1 rounded-full",
                    currentPlan.isFeatured
                      ? "bg-gradient-to-r from-secondary to-primary"
                      : "bg-secondary"
                  )} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={config.scheduler.defaultConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full"
            >
              <Button
                size="lg"
                className={cn(
                  "rounded-full px-8 transition-all duration-300",
                  currentPlan.isFeatured
                    ? "bg-gradient-to-r from-secondary to-primary text-secondary-foreground hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-xl"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                Get started
                {currentPlan.isFeatured && <Sparkles className="w-4 h-4 ml-2" />}
              </Button>
            </a>
            <a
              href={config.scheduler.defaultConfig.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="text-secondary hover:text-primary">
                or book a call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 