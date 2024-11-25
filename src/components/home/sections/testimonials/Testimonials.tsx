import tw, { styled } from 'twin.macro';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Section = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-xl text-muted-foreground pt-4 pb-8`}
`;
const TestimonialGrid = styled.div`
  ${tw`grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6`}
`;
const TestimonialCard = styled(Card)`
  ${tw`max-w-md md:break-inside-avoid overflow-hidden`}
`;
const CardHeaderStyled = styled(CardHeader)`
  ${tw`flex flex-row items-center gap-4 pb-2`}
`;
const UserInfo = styled.div`
  ${tw`flex flex-col`}
`;

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe",
    comment: "This landing page is awesome!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe1",
    comment:
      "Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
  },

  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe2",
    comment:
      "Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe3",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe4",
    comment:
      "Lorem ipsum dolor sit amet, tempor incididunt  aliqua. Ut enim ad minim veniam, quis nostrud.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "John Doe React",
    userName: "@john_Doe5",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const Testimonials = () => {
  return (
    <Section id="testimonials">
      <Title>
        Discover Why
        <GradientSpan> People Love </GradientSpan>
        This Landing Page
      </Title>

      <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error
        facere hic reiciendis illo
      </Description>

      <TestimonialGrid>
        {testimonials.map(({ image, name, userName, comment }: TestimonialProps) => (
          <TestimonialCard key={userName}>
            <CardHeaderStyled>
              <Avatar>
                <AvatarImage alt="" src={image} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>

              <UserInfo>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{userName}</CardDescription>
              </UserInfo>
            </CardHeaderStyled>

            <CardContent>{comment}</CardContent>
          </TestimonialCard>
        ))}
      </TestimonialGrid>
    </Section>
  );
};