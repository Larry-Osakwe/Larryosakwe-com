"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"])
  const height = useTransform(scrollY, [0, 100], ["6rem", "4rem"])
  const borderRadius = useTransform(scrollY, [0, 100], ["0.5rem", "2rem"])
  const nameOpacity = useTransform(scrollY, [0, 50], [1, 0])
  const buttonWidth = useTransform(scrollY, [0, 100], ["auto", "7rem"])
  const buttonBorderRadius = useTransform(scrollY, [0, 100], ["0.5rem", "2rem"])
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 4px 6px rgba(255, 154, 21, 0.1)", "0 8px 15px rgba(255, 154, 21, 0.2)"]
  )

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 bg-card z-50 flex items-center justify-between px-8"
      style={{ width, height, borderRadius, boxShadow }}
    >
      <div className="flex space-x-6">
        {navItems.slice(0, 3).map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
      </div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 font-extrabold text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        style={{ opacity: nameOpacity }}
      >
        LARRY OSAKWE
      </motion.div>
      <div className="flex space-x-6 items-center">
        {navItems.slice(3).map((item) => (
          <NavItem key={item.name} {...item} />
        ))}
        <motion.div style={{ width: buttonWidth }}>
          <Button
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-semibold"
            style={{ borderRadius: buttonBorderRadius.get() }}
          >
            Hire Me
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  )
}

function NavItem({ name, href }: { name: string; href: string }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.a
      href={href}
      className={cn(
        "relative text-foreground transition-colors duration-200 font-medium",
        isHovered && "text-primary"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {name}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  )
}

