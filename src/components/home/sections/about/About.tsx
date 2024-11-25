import { Statistics } from "./Statistics";
import Image from "next/image";
import tw, { styled } from 'twin.macro';

const AboutSection = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const ContentWrapper = styled.div`
  ${tw`bg-muted/50 border rounded-lg py-12`}
`;
const FlexContainer = styled.div`
  ${tw`px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12`}
`;
const StyledImage = styled(Image)`
  ${tw`object-contain rounded-lg`}
`;
const ContentColumn = styled.div`
  ${tw`flex flex-col justify-between`}
`;
const TextContent = styled.div`
  ${tw`pb-6`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Paragraph = styled.p`
  ${tw`text-xl text-muted-foreground mt-4`}
`;

export const About = () => {
  return (
    <AboutSection id="about">
      <ContentWrapper>
        <FlexContainer>
          <StyledImage
            src="https://cdn.pixabay.com/photo/2022/08/30/00/24/jump-7420029_1280.png"
            alt="background"
            width={300}
            height={300}
          />
          <ContentColumn>
            <TextContent>
              <Title>
                <GradientSpan>About </GradientSpan>
                Company
              </Title>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
            </TextContent>
            <Statistics />
          </ContentColumn>
        </FlexContainer>
      </ContentWrapper>
    </AboutSection>
  );
};