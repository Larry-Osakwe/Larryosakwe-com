"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import tw, { styled } from 'twin.macro'
import { Button, ButtonProps } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
  ${tw`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
`

const AlertDialogContent = styled(AlertDialogPrimitive.Content)`
  ${tw`fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950`}
`

const AlertDialogHeader = tw.div`flex flex-col space-y-2 text-center sm:text-left`
const AlertDialogFooter = tw.div`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`
const AlertDialogTitle = tw(AlertDialogPrimitive.Title)`text-lg font-semibold`
const AlertDialogDescription = tw(AlertDialogPrimitive.Description)`text-sm text-slate-500 dark:text-slate-400`

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & ButtonProps
>(({ ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <Button ref={ref} {...props} />
  </AlertDialogPrimitive.Action>
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & ButtonProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild>
    <Button
      ref={ref}
      variant="outline"
      {...props}
      css={[tw`mt-2 sm:mt-0`, className]}
    />
  </AlertDialogPrimitive.Cancel>
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
