import tw, { styled } from 'twin.macro';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { ButtonCheckout } from "@/components/checkout/ButtonCheckout";
import { config } from "@/config";

// Styled components
const PricingSection = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const MainTitle = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold text-center`}
`;
const GradientText = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Subtitle = styled.h3`
  ${tw`text-xl text-center text-muted-foreground pt-4 pb-8`}
`;
const GridContainer = styled.div<{ $cols: number }>`
  ${tw`grid grid-cols-1 md:grid-cols-2 gap-4 place-content-center place-items-center`}
  ${({ $cols }) => {
    switch ($cols) {
      case 1: return tw`lg:grid-cols-1`;
      case 2: return tw`lg:grid-cols-2`;
      case 3: return tw`lg:grid-cols-3`;
      default: return tw`lg:grid-cols-4`;
    }
  }}
`;
const PricingCard = styled(Card) <{ $featured?: boolean }>`
  ${tw`w-full max-w-sm`}
  ${({ $featured }) => $featured && tw`drop-shadow-xl shadow-black/10 dark:shadow-white/10`}
`;
const PriceDisplay = styled.div`
  ${tw`flex items-end gap-2`}
`;
const AnchorPrice = styled.span`
  ${tw`text-xl line-through text-muted-foreground/70`}
`;
const CurrentPrice = styled.div`
  ${tw`flex items-end`}
`;
const PriceAmount = styled.span`
  ${tw`text-3xl font-bold`}
`;
const PriceInterval = styled.span`
  ${tw`text-muted-foreground ml-1`}
`;
const Divider = styled.hr`
  ${tw`w-4/5 m-auto mb-4`}
`;
const FeatureList = styled.div`
  ${tw`space-y-4`}
`;
const FeatureItem = styled.span<{ $active?: boolean }>`
  ${tw`flex items-center`}
  ${({ $active }) => !$active && tw`text-muted-foreground/60`}
`;
const CheckIcon = styled(Check)`
  ${tw`text-green-500 h-5 w-5`}
`;
const XIcon = styled(X)`
  ${tw`text-muted-foreground/70 h-4 w-4`}
`;
const FeatureText = styled.h3`
  ${tw`ml-2`}
`;

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

  return (
    <PricingSection id="pricing">
      <MainTitle>
        Get
        <GradientText> Unlimited </GradientText>
        Access
      </MainTitle>
      <Subtitle>
        Choose the perfect plan for your needs
      </Subtitle>

      <div className={`max-w-${plans.length > 2 ? '5xl' : '3xl'} mx-auto`}>
        <GridContainer $cols={plans.length}>
          {plans.map((plan) => (
            <PricingCard key={plan.name} $featured={plan.isFeatured}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {plan.isFeatured && (
                    <Badge variant="secondary" className="text-sm text-primary">
                      Most popular
                    </Badge>
                  )}
                </CardTitle>
                <PriceDisplay>
                  {plan.priceAnchor && (
                    <AnchorPrice>${plan.priceAnchor}</AnchorPrice>
                  )}
                  <CurrentPrice>
                    <PriceAmount>${plan.price}</PriceAmount>
                    {plan.mode === 'subscription' && (
                      <PriceInterval>/month</PriceInterval>
                    )}
                  </CurrentPrice>
                </PriceDisplay>

                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ButtonCheckout
                  priceId={plan.priceId}
                  mode={plan.mode}
                />
              </CardContent>

              <Divider />

              <CardFooter>
                <FeatureList>
                  {getAllFeatures().map((featureName) => {
                    const hasFeature = hasPlanFeature(plan, featureName);
                    return (
                      <FeatureItem
                        key={featureName}
                        $active={hasFeature}
                      >
                        {hasFeature ? (
                          <CheckIcon />
                        ) : (
                          <XIcon />
                        )}
                        <FeatureText>{featureName}</FeatureText>
                      </FeatureItem>
                    );
                  })}
                </FeatureList>
              </CardFooter>
            </PricingCard>
          ))}
        </GridContainer>
      </div>
    </PricingSection>
  );
};