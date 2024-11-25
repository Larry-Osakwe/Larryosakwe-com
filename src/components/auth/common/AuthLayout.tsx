import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { LogoIcon } from "@/components/shared/icons/Icons"
import { config } from "@/config"
import tw, { styled } from 'twin.macro'

interface AuthLayoutProps {
  children: React.ReactNode
  showImage?: boolean
  heading: string
  subheading: string
}

const Container = styled.div<{ $showImage?: boolean }>`
  ${tw`container relative min-h-screen flex flex-col items-center justify-center`}
  ${({ $showImage }) => $showImage && tw`md:grid lg:max-w-none lg:grid-cols-2 lg:px-0`}
`;
const ImageSection = styled.div`
  ${tw`relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r`}
`;
const ImageOverlay = styled.div`
  ${tw`absolute inset-0 bg-zinc-900`}
`;
const ImageContainer = styled.div`
  ${tw`absolute inset-0 overflow-hidden`}
`;
const BackgroundImage = styled(Image)`
  ${tw`object-cover w-full h-full`}
`;
const DarkOverlay = styled.div`
  ${tw`absolute inset-0 bg-zinc-900 opacity-50`}
`;
const LogoLink = styled(Link)`
  ${tw`relative z-20 flex items-center text-lg font-medium`}
`;
const Testimonial = styled.div`
  ${tw`relative z-20 mt-auto`}
`;
const Quote = styled.p`
  ${tw`text-lg`}
`;
const Author = styled.footer`
  ${tw`text-sm`}
`;
const ContentSection = styled.div<{ $showImage?: boolean }>`
  ${({ $showImage }) => $showImage ? tw`lg:p-8` : tw`w-full`}
`;
const ContentContainer = styled.div`
  ${tw`mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]`}
`;
const LogoContainer = styled.div`
  ${tw`flex items-center justify-center mb-4`}
`;
const LogoText = styled.span`
  ${tw`ml-2 text-2xl font-bold`}
`;
const HeaderContainer = styled.div`
  ${tw`flex flex-col space-y-2 text-center`}
`;
const Heading = styled.h1`
  ${tw`text-2xl font-semibold tracking-tight`}
`;
const Subheading = styled.p`
  ${tw`text-sm text-muted-foreground`}
`;
const TermsText = styled.p`
  ${tw`px-8 text-center text-sm text-muted-foreground`}
`;
const TermsLink = styled(Link)`
  ${tw`underline underline-offset-4 hover:text-primary`}
`;

export function AuthLayout({ children, showImage = true, heading, subheading }: AuthLayoutProps) {
  return (
    <Container $showImage={showImage}>
      {showImage && (
        <ImageSection>
          <ImageOverlay />
          <ImageContainer>
            <BackgroundImage
              src="/auth-background.jpg"
              alt="Authentication background"
              width={1280}
              height={843}
              priority
            />
            <DarkOverlay />
          </ImageContainer>
          <LogoLink href="/">
            <LogoIcon />
            {config.appName}
          </LogoLink>
          <Testimonial>
            <blockquote className="space-y-2">
              <Quote>
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </Quote>
              <Author>Sofia Davis</Author>
            </blockquote>
          </Testimonial>
        </ImageSection>
      )}
      <ContentSection $showImage={showImage}>
        <ContentContainer>
          {!showImage && (
            <LogoContainer>
              <LogoIcon />
              <LogoText>{config.appName}</LogoText>
            </LogoContainer>
          )}
          <HeaderContainer>
            <Heading>{heading}</Heading>
            <Subheading>{subheading}</Subheading>
          </HeaderContainer>
          {children}
          <TermsText>
            By clicking continue, you agree to our{" "}
            <TermsLink href="/terms">
              Terms of Service
            </TermsLink>{" "}
            and{" "}
            <TermsLink href="/privacy">
              Privacy Policy
            </TermsLink>
            .
          </TermsText>
        </ContentContainer>
      </ContentSection>
    </Container>
  )
}
