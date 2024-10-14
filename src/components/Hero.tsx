'use client'

import React from 'react'
import tw, { styled } from 'twin.macro'
import { Button } from '@/components/ui/button'

const HeroWrapper = styled.section`
  ${tw`flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800`}
`

const HeroContent = styled.div`
  ${tw`max-w-3xl px-4`}
`

const HeroTitle = styled.h1`
  ${tw`mb-6 text-5xl font-bold text-slate-900 dark:text-slate-100`}
`

const HeroSubtext = styled.p`
  ${tw`mb-8 text-xl text-slate-700 dark:text-slate-300`}
`

const StyledButton = styled(Button)`
  ${tw`px-8 py-3 text-lg`}
`

const Hero: React.FC = () => {
  return (
    <HeroWrapper>
      <HeroContent>
        <HeroTitle>Welcome to Our Amazing Platform</HeroTitle>
        <HeroSubtext>
          Discover the power of innovation and simplicity in one place. 
          Start your journey with us today.
        </HeroSubtext>
        <StyledButton variant="default">Get Started</StyledButton>
      </HeroContent>
    </HeroWrapper>
  )
}

export default Hero
