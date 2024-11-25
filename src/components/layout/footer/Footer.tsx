import { config } from "@/config";
import { LogoIcon } from "@/components/shared/icons/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import tw, { styled } from 'twin.macro';

// Styled components
const FooterContainer = styled.footer`
  ${tw``}
`;
const Divider = styled.hr`
  ${tw`w-11/12 mx-auto`}
`;
const GridSection = styled.section`
  ${tw`container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8`}
`;
const BrandSection = styled.div`
  ${tw`col-span-full xl:col-span-2`}
`;
const BrandLink = styled.a`
  ${tw`font-bold text-xl flex`}
`;
const Description = styled.p`
  ${tw`mt-4 text-sm text-secondary-foreground`}
`;
const FlareStackButton = styled(Button)`
  ${tw`mt-4 rounded-sm`}
`;
const SmallLogo = styled(LogoIcon)`
  ${tw`mx-1 pb-0.5 w-4 h-4`}
`;
const FooterColumn = styled.div`
  ${tw`flex flex-col gap-2`}
`;
const ColumnTitle = styled.h3`
  ${tw`font-bold text-lg`}
`;
const FooterLink = styled.a`
  ${tw`opacity-60 hover:opacity-100`}
`;
const Copyright = styled.section`
  ${tw`container pb-14 text-center`}
`;
const CopyrightLink = styled.a`
  ${tw`text-primary transition-all border-primary hover:border-b-2`}
`;

export const Footer = () => {
  return (
    <FooterContainer id="footer">
      <Divider />

      <GridSection>
        <BrandSection>
          <BrandLink
            rel="noreferrer noopener"
            href="/"
          >
            <LogoIcon />
            {config.appName}
          </BrandLink>
          <Description>{config.appDescription}</Description>
          <Description>Copyright © 2024 - All rights reserved</Description>
          <Link
            href="https://flarestack.io"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FlareStackButton size="sm" variant="outline">
              Built with <SmallLogo /> FlareStack
            </FlareStackButton>
          </Link>
        </BrandSection>

        <FooterColumn>
          <ColumnTitle>Follow US</ColumnTitle>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="https://github.com/larry-osakwe"
            >
              Github
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="https://twitter.com/lairelaflare"
            >
              Twitter
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/larry-osakwe/"
            >
              LinkedIn
            </FooterLink>
          </div>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Legal</ColumnTitle>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="/terms"
            >
              Terms of Service
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="/privacy"
            >
              Privacy Policy
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="/license"
            >
              License
            </FooterLink>
          </div>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>About</ColumnTitle>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="#features"
            >
              Features
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="#pricing"
            >
              Pricing
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="#faq"
            >
              FAQ
            </FooterLink>
          </div>
          <div>
            <FooterLink
              rel="noreferrer noopener"
              href="/docs"
            >
              Documentation
            </FooterLink>
          </div>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Built with FlareStack</ColumnTitle>
          Coming Soon
        </FooterColumn>
      </GridSection>

      <Copyright>
        <h3>
          &copy; 2024 Landing page made by{" "}
          <CopyrightLink
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/larry-osakwe/"
          >
            Larry Osakwe
          </CopyrightLink>
        </h3>
      </Copyright>
    </FooterContainer>
  );
};