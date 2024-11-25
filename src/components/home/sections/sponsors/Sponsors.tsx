import tw, { styled } from 'twin.macro';
import { Radar } from "lucide-react";

const Section = styled.section`
  ${tw`container pt-24 sm:py-32`}
`;
const Title = styled.h2`
  ${tw`text-center text-md lg:text-xl font-bold mb-8 text-primary`}
`;
const SponsorGrid = styled.div`
  ${tw`flex flex-wrap justify-center items-center gap-4 md:gap-8`}
`;
const SponsorItem = styled.div`
  ${tw`flex items-center gap-1 text-muted-foreground/60`}
`;
const SponsorName = styled.h3`
  ${tw`text-xl font-bold`}
`;

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Radar size={34} />,
    name: "Sponsor 1",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 2",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 3",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 4",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 5",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 6",
  },
];

export const Sponsors = () => {
  return (
    <Section id="sponsors">
      <Title>Investors and founders</Title>

      <SponsorGrid>
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <SponsorItem key={name}>
            <span>{icon}</span>
            <SponsorName>{name}</SponsorName>
          </SponsorItem>
        ))}
      </SponsorGrid>
    </Section>
  );
};