import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { ButtonCheckout } from "@/components/checkout/ButtonCheckout";
import { config } from "@/config";

export const Pricing = () => {
  const plans = config.stripe.plans;
  
  // Get all unique features across all plans
  const getAllFeatures = () => {
    const allFeatures = new Set<string>();
    plans.forEach(plan => {
      plan.features.forEach(feature => {
        allFeatures.add(feature.name);
      });
    });
    return Array.from(allFeatures);
  };

  // Check if a plan has a specific feature
  const hasPlanFeature = (plan: typeof plans[0], featureName: string) => {
    return plan.features.some(f => f.name === featureName);
  };

  // Dynamic grid columns based on number of plans
  const getGridCols = () => {
    switch(plans.length) {
      case 1: return 'lg:grid-cols-1';
      case 2: return 'lg:grid-cols-2';
      case 3: return 'lg:grid-cols-3';
      default: return 'lg:grid-cols-4';
    }
  };

  // Dynamic max-width based on number of plans
  const getMaxWidth = () => {
    switch(plans.length) {
      case 1: return 'max-w-md';
      case 2: return 'max-w-3xl';
      case 3: return 'max-w-5xl';
      default: return 'max-w-7xl';
    }
  };

  const getPriceDisplay = (plan: typeof plans[0]) => {
    const priceString = `$${plan.price}`;
    return plan.mode === 'subscription' ? `${priceString}/month` : priceString;
  };

  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Choose the perfect plan for your needs
      </h3>
      
      <div className={`${getMaxWidth()} mx-auto`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${getGridCols()} gap-4 place-content-center place-items-center`}>
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`w-full max-w-sm ${plan.isFeatured ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.isFeatured && (
                    <Badge variant="secondary" className="text-sm text-primary">
                      Most popular
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-end gap-2">
                  {plan.priceAnchor && (
                    <div className="flex items-end mb-1">
                      <span className="text-xl line-through text-muted-foreground/70">
                        ${plan.priceAnchor}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-3xl font-bold">${plan.price}</span>
                    {plan.mode === 'subscription' && (
                      <span className="text-muted-foreground ml-1">/month</span>
                    )}
                  </div>
                </div>

                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ButtonCheckout 
                  priceId={plan.priceId} 
                  mode={plan.mode}
                />
              </CardContent>

              <hr className="w-4/5 m-auto mb-4" />

              <CardFooter className="flex">
                <div className="space-y-4">
                  {getAllFeatures().map((featureName) => {
                    const hasFeature = hasPlanFeature(plan, featureName);
                    return (
                      <span 
                        key={featureName} 
                        className={`flex items-center ${!hasFeature ? 'text-muted-foreground/60' : ''}`}
                      >
                        {hasFeature ? (
                          <Check className="text-green-500 h-5 w-5" />
                        ) : (
                          <X className="text-muted-foreground/70 h-4 w-4" />
                        )}
                        <h3 className="ml-2">{featureName}</h3>
                      </span>
                    );
                  })}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};