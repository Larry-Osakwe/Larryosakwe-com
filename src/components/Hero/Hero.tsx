import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import { ButtonCheckout } from "../ButtonCheckout";

// Styled components using twin.macro
const HeroSection = tw.section`container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10`;
const ContentWrapper = tw.div`text-center lg:text-start space-y-6`;
const MainHeading = tw.main`text-5xl md:text-6xl font-bold`;
const GradientSpan = styled.span`
  ${tw`inline bg-gradient-to-r from-[#ff9a15] to-[#e26215] text-transparent bg-clip-text`}
`;
const Paragraph = tw.p`text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0`;
const ButtonWrapper = tw.div`space-y-4 md:space-y-0 md:space-x-4`;
const ImageWrapper = tw.div`z-10 w-full h-full relative`;

export const Hero = () => {
  return (
    <HeroSection>
      <ContentWrapper>
        <MainHeading>
          <h1 className="inline">
            <GradientSpan>
              Prototype
            </GradientSpan>{" "}
            ideas faster with
          </h1>{" "}
          <h2 className="inline">
            <GradientSpan>
              FlareStack
            </GradientSpan>
          </h2>
        </MainHeading>

        <Paragraph>
          Launch your next project in days, not weeks. Our well-documented Next.js boilerplate empowers developers to build and deploy quickly.
        </Paragraph>

        <ButtonWrapper>
          <ButtonCheckout className="w-full md:w-1/3"/>
        </ButtonWrapper>
      </ContentWrapper>

      {/* Hero image section */}
      <ImageWrapper>
        <Image
          src="/hero-image.png"
          alt="FlareStack Hero Image"
          width={700}
          height={500}
          priority
        />
      </ImageWrapper>

      {/* Shadow effect */}
      <div className="shadow"></div>

    </HeroSection>
  );
};
