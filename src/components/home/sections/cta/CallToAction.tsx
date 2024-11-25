import { Button } from "@/components/ui/button";
import tw, { styled } from 'twin.macro';

const CTASection = styled.section`
  ${tw`bg-muted/50 py-16 my-24 sm:my-32`}
`;
const Container = styled.div`
  ${tw`container lg:grid lg:grid-cols-2 place-items-center`}
`;
const ContentColumn = styled.div`
  ${tw`lg:col-start-1`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-muted-foreground text-xl mt-4 mb-8 lg:mb-0`}
`;
const ButtonGroup = styled.div`
  ${tw`space-y-4 lg:col-start-2`}
`;
const PrimaryButton = styled(Button)`
  ${tw`w-full md:mr-4 md:w-auto`}
`;
const SecondaryButton = styled(Button)`
  ${tw`w-full md:w-auto`}
`;

export const CTA = () => {
  return (
    <CTASection id="cta">
      <Container>
        <ContentColumn>
          <Title>
            All Your
            <GradientSpan> Ideas & Concepts </GradientSpan>
            In One Interface
          </Title>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos.
          </Description>
        </ContentColumn>

        <ButtonGroup>
          <PrimaryButton>Request a Demo</PrimaryButton>
          <SecondaryButton variant="outline">
            View all features
          </SecondaryButton>
        </ButtonGroup>
      </Container>
    </CTASection>
  );
};