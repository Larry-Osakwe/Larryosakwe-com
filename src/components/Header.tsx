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

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo>Your Logo</Logo>
      <StyledNavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <StyledNavigationMenuLink href="/">Home</StyledNavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <StyledNavigationMenuTrigger>About</StyledNavigationMenuTrigger>
            <NavigationMenuContent>
              <ul tw="p-4 w-[200px] bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-md">
                <li><StyledNavigationMenuLink href="/about/team">Our Team</StyledNavigationMenuLink></li>
                <li><StyledNavigationMenuLink href="/about/mission">Our Mission</StyledNavigationMenuLink></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <StyledNavigationMenuLink href="/services">Services</StyledNavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <StyledNavigationMenuLink href="/contact">Contact</StyledNavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </StyledNavigationMenu>
    </HeaderWrapper>
  )
}

export default Header