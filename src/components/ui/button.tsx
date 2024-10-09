import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import tw, { styled } from 'twin.macro'

const BaseButton = tw.button`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300`

const buttonVariants = {
  default: tw`bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90`,
  destructive: tw`bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90`,
  outline: tw`border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50`,
  secondary: tw`bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80`,
  ghost: tw`hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50`,
  link: tw`text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50`,
}

const buttonSizes = {
  default: tw`h-10 px-4 py-2`,
  sm: tw`h-9 rounded-md px-3`,
  lg: tw`h-11 rounded-md px-8`,
  icon: tw`h-10 w-10`,
}

const StyledButton = styled(BaseButton)<{ variant?: keyof typeof buttonVariants; size?: keyof typeof buttonSizes }>(
  ({ variant = 'default', size = 'default' }) => [
    buttonVariants[variant],
    buttonSizes[size],
  ]
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : StyledButton
    return (
      <Comp
        className={className}
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
