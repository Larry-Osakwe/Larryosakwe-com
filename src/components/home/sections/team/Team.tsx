import tw, { styled } from 'twin.macro';
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

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
  ${tw`mt-4 mb-10 text-xl text-muted-foreground`}
`;
const TeamGrid = styled.div`
  ${tw`grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10`}
`;
const TeamCard = styled(Card)`
  ${tw`bg-muted/50 relative mt-8 flex flex-col justify-center items-center`}
`;
const ProfileImage = styled.img`
  ${tw`absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover`}
`;
const CardHeaderStyled = styled(CardHeader)`
  ${tw`mt-8 flex justify-center items-center pb-2`}
`;
const Position = styled(CardDescription)`
  ${tw`text-primary`}
`;
const Bio = styled(CardContent)`
  ${tw`text-center pb-2`}
`;

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=35",
    name: "Emma Smith",
    position: "Product Manager",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/larry-osakwe/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=60",
    name: "John Doe",
    position: "Tech Lead",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/larry-osakwe/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=36",
    name: "Ashley Ross",
    position: "Frontend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/larry-osakwe/",
      },

      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=17",
    name: "Bruce Rogers",
    position: "Backend Developer",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/larry-osakwe/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <Section id="team">
      <Title>
        <GradientSpan>Our Dedicated </GradientSpan>
        Crew
      </Title>

      <Description>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </Description>

      <TeamGrid>
        {teamList.map(({ imageUrl, name, position, socialNetworks }: TeamProps) => (
          <TeamCard key={name}>
            <CardHeaderStyled>
              <ProfileImage
                src={imageUrl}
                alt={`${name} ${position}`}
              />
              <CardTitle>{name}</CardTitle>
              <Position>{position}</Position>
            </CardHeaderStyled>

            <Bio>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Bio>

            <CardFooter>
              {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                <div key={name}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </TeamCard>
        ))}
      </TeamGrid>
    </Section>
  );
};