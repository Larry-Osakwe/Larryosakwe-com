import tw, { styled } from 'twin.macro';

const StatsSection = styled.section`
  ${tw``}
`;
const StatsGrid = styled.div`
  ${tw`grid grid-cols-2 lg:grid-cols-4 gap-8`}
`;
const StatItem = styled.div`
  ${tw`space-y-2 text-center`}
`;
const StatQuantity = styled.h2`
  ${tw`text-3xl sm:text-4xl font-bold`}
`;
const StatDescription = styled.p`
  ${tw`text-xl text-muted-foreground`}
`;

interface StatsProps {
  quantity: string;
  description: string;
}

export const Statistics = () => {
  const stats: StatsProps[] = [
    {
      quantity: "2.7K+",
      description: "Users",
    },
    {
      quantity: "1.8K+",
      description: "Subscribers",
    },
    {
      quantity: "112",
      description: "Downloads",
    },
    {
      quantity: "4",
      description: "Products",
    },
  ];

  return (
    <StatsSection id="statistics">
      <StatsGrid>
        {stats.map(({ quantity, description }: StatsProps) => (
          <StatItem key={description}>
            <StatQuantity>{quantity}</StatQuantity>
            <StatDescription>{description}</StatDescription>
          </StatItem>
        ))}
      </StatsGrid>
    </StatsSection>
  );
};