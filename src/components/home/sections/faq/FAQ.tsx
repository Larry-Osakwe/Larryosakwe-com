import tw, { styled } from 'twin.macro';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { config } from "@/config";

const Section = styled.section`
  ${tw`container py-24 sm:py-32`}
`;
const Title = styled.h2`
  ${tw`text-3xl md:text-4xl font-bold mb-4`}
`;
const GradientSpan = styled.span`
  ${tw`bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text`}
`;
const StyledAccordion = styled(Accordion)`
  ${tw`w-full`}
`;
const ContactText = styled.h3`
  ${tw`font-medium mt-4`}
`;
const ContactLink = styled.a`
  ${tw`text-primary transition-all border-primary hover:border-b-2`}
`;

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What do I get exactly?",
    answer: "You get a fully functional landing page, blog, and various modular components with a modern design and a lot of features, including but not limited to: authentication, payment processing, and more. Also step by step instructions on how to use the various features and deploy it. It's everything you need to launch your app quickly to start building a portfolio or start making money.",
    value: "item-1",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We aim to provide a great product and we are confident you will love it. If you are not satisfied, please contact us and we will assess your request on a case by case basis.",
    value: "item-2",
  },
  {
    question:
      "How often is the FlareStack boilerplate updated?",
    answer:
      "We are constantly using FlareStack to build our own projects, which means we are always updating the boilerplate to ensure it is always up to date with the latest technologies and best practices. You can see the full changelog in the repository.",
    value: "item-3",
  },
  {
    question: "I can build something similar myself? Why should I buy FlareStack?",
    answer: "You can build something similar yourself, but it will take you a lot of time and effort. With FlareStack, you get a fully functional boilerplate that you can launch in minutes. You also get step by step instructions on how to deploy it which lets you focus on building products instead of infrastructure.",
    value: "item-4",
  },
  {
    question:
      "Is FlareStack built in JavaScript or TypeScript?",
    answer:
      "FlareStack is built in TypeScript. We believe it's the best way to build scalable and maintainable apps.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <Section id="faq">
      <Title>
        Frequently Asked{" "}
        <GradientSpan>Questions</GradientSpan>
      </Title>

      <StyledAccordion type="single" collapsible>
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </StyledAccordion>

      <ContactText>
        Still have questions?{" "}
        <ContactLink
          rel="noreferrer noopener"
          href={`mailto:${config.resend.support.email}?subject=Need help with ${config.appName}`}
        >
          Contact us
        </ContactLink>
      </ContactText>
    </Section>
  );
};