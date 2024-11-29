import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { ButtonCheckout } from "@/components/checkout/ButtonCheckout";
import { config } from "@/config"
import { Button } from '@/components/ui/button';

// Styled components
const HeroSection = styled.section`
  ${tw`container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10`}
`;
const ContentWrapper = styled.div`
  ${tw`text-center lg:text-start space-y-6`}
`;
const MainHeading = styled.main`
  ${tw`text-5xl md:text-6xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`inline bg-gradient-to-r from-[#ff9a15] to-[#e26215] text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0`}
`;
const ButtonWrapper = styled.div`
  ${tw`flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 pt-4`}
`;
const ImageWrapper = styled.div`
  ${tw`z-10 w-full h-full relative`}
`;
const StyledImage = styled(Image)`
  ${tw`object-contain`}
`;

export const Hero = () => {
  return (
    <HeroSection>
      <ImageWrapper>
        <StyledImage
          src="/hero-image.png"
          alt="FlareStack Hero Image"
          width={700}
          height={500}
          priority
        />
      </ImageWrapper>

      <ContentWrapper>
        <MainHeading>
          <h1 className="inline">
            <GradientSpan>Hi</GradientSpan>{", "}
            I'm Larry
          </h1>{" "}
          <br />
          <h2 className="inline">I like to </h2>
          <h2 className="inline">
            <GradientSpan>build</GradientSpan>
          </h2>
        </MainHeading>

        <Description>
          I'm a software engineer with a passion for building products that help people live better lives.
        </Description>

        <ButtonWrapper>
          <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90">
            Get in touch
          </Button>
          <Button size="lg" variant="outline" className="w-full md:w-auto">
            Check my work
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </HeroSection>
  );
};
