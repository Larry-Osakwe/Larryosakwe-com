import tw, { styled } from 'twin.macro';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Medal, Map, Plane, Gift } from "lucide-react";

const Section = styled.section`
  ${tw`container text-center py-24 sm:py-32`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground`}
`;
const FeatureGrid = styled.div`
  ${tw`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`}
`;
const FeatureCard = styled(Card)`
  ${tw`bg-muted/50`}
`;
const IconTitle = styled(CardTitle)`
  ${tw`grid gap-4 place-items-center`}
`;
interface FeatureProps {
  icon?: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Medal />,
    title: "Accessibility",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Map />,
    title: "Community",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Plane />,
    title: "Scalability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
  {
    icon: <Gift />,
    title: "Gamification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  },
];

export const HowItWorks = () => {
  return (
    <Section id="howItWorks">
      <Title>
        How It{" "}
        <GradientSpan>Works </GradientSpan>
        Step-by-Step Guide
      </Title>
      <Description>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </Description>

      <FeatureGrid>
        {features.map(({ icon, title, description }: FeatureProps) => (
          <FeatureCard key={title}>
            <CardHeader>
              <IconTitle>
                {icon}
                {title}
              </IconTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </Section>
  );
};
