import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tw, { styled } from 'twin.macro';

const NewsletterSection = styled.section`
  ${tw``}
`;
const Divider = styled.hr`
  ${tw`w-11/12 mx-auto`}
`;
const Container = styled.div`
  ${tw`container py-24 sm:py-32`}
`;
const Title = styled.h3`
  ${tw`text-center text-4xl md:text-5xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-xl text-muted-foreground text-center mt-4 mb-8`}
`;
const Form = styled.form`
  ${tw`flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2`}
`;
const StyledInput = styled(Input)`
  ${tw`bg-muted/50 dark:bg-muted/80`}
`;
export const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <NewsletterSection id="newsletter">
      <Divider />

      <Container>
        <Title>
          Join Our Daily{" "}
          <GradientSpan>Newsletter</GradientSpan>
        </Title>
        <Description>
          Lorem ipsum dolor sit amet consectetur.
        </Description>

        <Form onSubmit={handleSubmit}>
          <StyledInput
            placeholder="name@gmail.com"
            aria-label="email"
          />
          <Button>Subscribe</Button>
        </Form>
      </Container>

      <Divider />
    </NewsletterSection>
  );
};