import tw, { styled } from 'twin.macro';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Wallet, BarChart } from "lucide-react";
import Image from "next/image";

const Section = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const Grid = styled.div`
  ${tw`grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center`}
`;
const ContentColumn = styled.div`
  ${tw`flex flex-col gap-8`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const Description = styled.p`
  ${tw`text-muted-foreground text-xl mt-4 mb-8`}
`;
const IconWrapper = styled.div`
  ${tw`mt-1 bg-primary/20 p-1 rounded-2xl`}
`;
const ServiceImage = styled(Image)`
  ${tw`object-contain rounded-lg`}
`;

interface ServiceProps {
  title: string;
  description: string;
  icon?: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Code Collaboration",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <BarChart />,
  },
  {
    title: "Project Management",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <Wallet />,
  },
  {
    title: "Task Automation",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
    icon: <Search />,
  },
];

export const Services = () => {
  return (
    <Section>
      <Grid>
        <div>
          <Title>
            <GradientSpan>Client-Centric </GradientSpan>
            Services
          </Title>

          <Description>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </Description>

          <ContentColumn>
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <IconWrapper>{icon}</IconWrapper>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </ContentColumn>
        </div>
        <ServiceImage
          src="https://cdn.pixabay.com/photo/2022/08/25/23/06/woman-7411414_1280.png"
          alt="background"
          width={500}
          height={400}
        />
      </Grid>
    </Section>
  );
};