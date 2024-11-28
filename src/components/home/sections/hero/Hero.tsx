import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { ButtonCheckout } from "@/components/checkout/ButtonCheckout";
import { config } from "@/config"

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
  ${tw`space-y-4 md:space-y-0 md:space-x-4`}
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
            <GradientSpan>Build</GradientSpan>{" "}
            ideas faster with
          </h1>{" "}
          <h2 className="inline">
            <GradientSpan>FlareStack</GradientSpan>
          </h2>
        </MainHeading>

        <Description>
          Launch your next project in days, not weeks. Our well-documented Next.js boilerplate empowers developers to build and deploy quickly.
        </Description>

        <ButtonWrapper>
          <ButtonCheckout
            className="w-full md:w-1/3"
            priceId={config.stripe.plans[1].priceId}
            mode={config.stripe.plans[1].mode}
          />
        </ButtonWrapper>
      </ContentWrapper>
    </HeroSection>
  );
};
