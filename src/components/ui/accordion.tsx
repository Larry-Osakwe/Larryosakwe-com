"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import tw from 'twin.macro'

const Accordion = AccordionPrimitive.Root

const AccordionItem = tw(AccordionPrimitive.Item)`border-b`

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header tw="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      css={[
        tw`flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline`,
        tw`[&[data-state=open]>svg]:rotate-180`,
        className
      ]}
      {...props}
    >
      {children}
      <ChevronDown tw="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    css={[
      tw`overflow-hidden text-sm transition-all`,
      tw`data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`,
      className
    ]}
    {...props}
  >
    <div tw="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
