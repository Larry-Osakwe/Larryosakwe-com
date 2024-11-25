"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import tw, { styled } from 'twin.macro'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ThemeButton = styled(Button)`
  ${tw`ghost`}
`;
const SunIcon = styled(Sun)`
  ${tw`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
`;
const MoonIcon = styled(Moon)`
  ${tw`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
`;
const ScreenReaderText = styled.span`
  ${tw`sr-only`}
`;
const MenuItem = styled(DropdownMenuItem)`
  ${tw`cursor-pointer`}
`;

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ThemeButton variant="ghost" size="icon">
          <SunIcon />
          <MoonIcon />
          <ScreenReaderText>Toggle theme</ScreenReaderText>
        </ThemeButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <MenuItem onClick={() => setTheme("light")}>
          Light
        </MenuItem>
        <MenuItem onClick={() => setTheme("dark")}>
          Dark
        </MenuItem>
        <MenuItem onClick={() => setTheme("system")}>
          System
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
