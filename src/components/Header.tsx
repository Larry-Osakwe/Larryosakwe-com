'use client'

import React from 'react'
import tw, { styled } from 'twin.macro'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'

const HeaderWrapper = styled.header`
  ${tw`w-full py-4 px-6 flex justify-between items-center`}
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-bottom: 1px solid hsl(var(--border));
`

const Logo = styled.div`
  ${tw`text-2xl font-bold`}
  color: hsl(var(--primary));
`

const StyledNavigationMenu = styled(NavigationMenu)`
  ${tw`flex-grow flex justify-end`}
`

const StyledNavigationMenuLink = styled(NavigationMenuLink)`
  ${tw`px-3 py-2 rounded-md transition-colors duration-200`}
  color: hsl(var(--foreground));
  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
`

const StyledNavigationMenuTrigger = styled(NavigationMenuTrigger)`
  ${tw`px-3 py-2 rounded-md transition-colors duration-200`}
  color: hsl(var(--foreground));
  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
`

const StyledNavigationMenuContent = styled(NavigationMenuContent)`
  ${tw`p-4 w-[200px] rounded-md`}
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
`

const StyledNavigationMenuList = styled(NavigationMenuList)`
  ${tw`list-none p-0 m-0`}
`

const StyledNavigationMenuItem = styled(NavigationMenuItem)`
  ${tw`mb-2`}
`

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo>Your Logo</Logo>
      <StyledNavigationMenu>
        <StyledNavigationMenuList>
          <StyledNavigationMenuItem>
            <StyledNavigationMenuLink href="/">Home</StyledNavigationMenuLink>
          </StyledNavigationMenuItem>
          <StyledNavigationMenuItem>
            <StyledNavigationMenuTrigger>About</StyledNavigationMenuTrigger>
            <StyledNavigationMenuContent>
              <StyledNavigationMenuList>
                <StyledNavigationMenuItem>
                  <StyledNavigationMenuLink href="/about/team">Our Team</StyledNavigationMenuLink>
                </StyledNavigationMenuItem>
                <StyledNavigationMenuItem>
                  <StyledNavigationMenuLink href="/about/mission">Our Mission</StyledNavigationMenuLink>
                </StyledNavigationMenuItem>
              </StyledNavigationMenuList>
            </StyledNavigationMenuContent>
          </StyledNavigationMenuItem>
          <StyledNavigationMenuItem>
            <StyledNavigationMenuLink href="/services">Services</StyledNavigationMenuLink>
          </StyledNavigationMenuItem>
          <StyledNavigationMenuItem>
            <StyledNavigationMenuLink href="/contact">Contact</StyledNavigationMenuLink>
          </StyledNavigationMenuItem>
        </StyledNavigationMenuList>
      </StyledNavigationMenu>
    </HeaderWrapper>
  )
}

export default Header
