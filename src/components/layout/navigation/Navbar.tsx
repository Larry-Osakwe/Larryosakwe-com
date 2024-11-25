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
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { LogoIcon } from "@/components/shared/icons/Icons";
import { config } from "@/config"
import { ButtonCheckout } from "@/components/checkout/ButtonCheckout";
import ButtonSignIn from "@/components/auth/common/ButtonSignIn";

// Styled components
const HeaderWrapper = styled.header`
  ${tw`sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background`}
`;
const StyledNavigationMenu = styled(NavigationMenu)`
  ${tw`mx-auto`}
`;
const StyledNavigationMenuList = styled(NavigationMenuList)`
  ${tw`container h-14 px-4 w-screen flex justify-between`}
`;
const LogoMenuItem = styled(NavigationMenuItem)`
  ${tw`font-bold flex`}
`;
const LogoLink = styled.a`
  ${tw`ml-2 font-bold text-xl flex`}
`;
const MobileActions = styled.span`
  ${tw`flex md:hidden`}
`;
const DesktopNav = styled.nav`
  ${tw`hidden md:flex gap-2`}
`;
const DesktopActions = styled.div`
  ${tw`hidden md:flex gap-2`}
`;
const MobileNavContent = styled.nav`
  ${tw`flex flex-col justify-center items-center gap-2 mt-4`}
`;
const StyledSheetTrigger = styled(SheetTrigger)`
  ${tw`px-2`}
`;
const MenuIcon = styled(Menu)`
  ${tw`flex md:hidden h-5 w-5`}
`;
const SheetTitleWrapper = styled.div`
  ${tw`font-bold text-xl`}
`;
const NavLink = styled.a`
  ${tw`text-[17px]`}
`;

// Navigation items configuration
const navItems = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <HeaderWrapper>
      <StyledNavigationMenu>
        <StyledNavigationMenuList>
          {/* Logo and App Name */}
          <LogoMenuItem>
            <LogoLink href="/" rel="noreferrer noopener">
              <LogoIcon />
              <span>{config.appName.toUpperCase()}</span>
            </LogoLink>
          </LogoMenuItem>

          {/* Mobile Navigation */}
          <MobileActions>
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <StyledSheetTrigger>
                <MenuIcon onClick={() => setIsOpen(true)} aria-label="Menu Icon" />
              </StyledSheetTrigger>

              <SheetContent side="left">
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
                  <ButtonCheckout
                    priceId={config.stripe.plans[1].priceId}
                    mode={config.stripe.plans[1].mode}
                  />
                </MobileNavContent>
              </SheetContent>
            </Sheet>
          </MobileActions>

          {/* Desktop Navigation */}
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

          {/* Desktop Actions */}
          <DesktopActions>
            <ButtonSignIn />
            <ModeToggle />
          </DesktopActions>
        </StyledNavigationMenuList>
      </StyledNavigationMenu>
    </HeaderWrapper>
  );
};
