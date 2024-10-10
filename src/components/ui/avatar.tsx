"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import tw, { styled } from 'twin.macro'

const AvatarRoot = styled(AvatarPrimitive.Root)`
  ${tw`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`}
`

const AvatarImage = styled(AvatarPrimitive.Image)`
  ${tw`aspect-square h-full w-full`}
`

const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  ${tw`flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800`}
`

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarRoot>

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarRoot>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarRoot ref={ref} className={className} {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarImage>

const AvatarImageComponent = React.forwardRef<
  React.ElementRef<typeof AvatarImage>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarImage ref={ref} className={className} {...props} />
))
AvatarImageComponent.displayName = AvatarPrimitive.Image.displayName

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarFallback>

const AvatarFallbackComponent = React.forwardRef<
  React.ElementRef<typeof AvatarFallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarFallback ref={ref} className={className} {...props} />
))
AvatarFallbackComponent.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImageComponent as AvatarImage, AvatarFallbackComponent as AvatarFallback }
