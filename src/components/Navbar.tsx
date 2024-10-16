import { useState } from "react";
import tw, { styled } from 'twin.macro';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./DarkMode/mode-toggle";
import { LogoIcon } from "./Icons";
import { config } from "../../config";

// Styled components
const HeaderWrapper = tw.header`sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background`;
const StyledNavigationMenu = styled(NavigationMenu)`${tw`mx-auto`}`;
const StyledNavigationMenuList = styled(NavigationMenuList)`${tw`container h-14 px-4 w-screen flex justify-between`}`;
const LogoMenuItem = styled(NavigationMenuItem)`${tw`font-bold flex`}`;
const LogoLink = tw.a`ml-2 font-bold text-xl flex`;
const MobileActions = tw.span`flex md:hidden`;
const DesktopNav = tw.nav`hidden md:flex gap-2`;
const DesktopActions = tw.div`hidden md:flex gap-2`;
const MobileNavContent = tw.nav`flex flex-col justify-center items-center gap-2 mt-4`;
const StyledSheetTrigger = styled(SheetTrigger)`${tw`px-2`}`;
const MenuIcon = styled(Menu)`${tw`flex md:hidden h-5 w-5`}`;
const SheetTitleWrapper = tw.div`font-bold text-xl`;
const NavLink = styled.a<{ $isGithub?: boolean }>`
  ${tw`text-[17px]`}
  ${({ $isGithub }) => $isGithub && tw`border`}
  ${({ $isGithub }) => $isGithub && tw`w-[110px]`}
`;
const StyledGitHubLogoIcon = styled(GitHubLogoIcon)`${tw`mr-2 w-5 h-5`}`;

// Navigation items
const navItems = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <HeaderWrapper>
      <StyledNavigationMenu>
        <StyledNavigationMenuList>
          <LogoMenuItem>
            <LogoLink href="/" rel="noreferrer noopener">
              {/* TODO: Customize your logo in the Icons.tsx file */}
              <LogoIcon />
              <span>{config.appName}</span>
            </LogoLink>
          </LogoMenuItem>

          {/* mobile */}
          <MobileActions>
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <StyledSheetTrigger>
                <MenuIcon onClick={() => setIsOpen(true)} aria-label="Menu Icon" />
              </StyledSheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <LogoIcon />
                  <SheetTitle>
                    <SheetTitleWrapper>{config.appName}</SheetTitleWrapper>
                  </SheetTitle>
                </SheetHeader>
                <MobileNavContent>
                  {navItems.map((route, i) => (
                    <NavLink
                      key={i}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {route.label}
                    </NavLink>
                  ))}
                  <NavLink
                    $isGithub
                    href={config.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    <StyledGitHubLogoIcon />
                    Github
                  </NavLink>
                </MobileNavContent>
              </SheetContent>
            </Sheet>
          </MobileActions>

          {/* desktop */}
          <DesktopNav>
            {navItems.map((route, i) => (
              <NavLink
                key={i}
                href={route.href}
                className={buttonVariants({ variant: "ghost" })}
              >
                {route.label}
              </NavLink>
            ))}
          </DesktopNav>

          <DesktopActions>
            <NavLink
              $isGithub
              href={config.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: "secondary" })}
            >
              <StyledGitHubLogoIcon />
              Github
            </NavLink>
            <ModeToggle />
          </DesktopActions>
        </StyledNavigationMenuList>
      </StyledNavigationMenu>
    </HeaderWrapper>
  );
};
