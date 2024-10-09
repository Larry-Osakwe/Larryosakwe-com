'use client'

import tw from 'twin.macro';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"


const Container = tw.div`flex flex-col items-center justify-center min-h-screen py-2`

export default function Home() {
  return (
    <Container>
      <main>
        <h1 tw="text-6xl font-bold">
          Test
        </h1>
        <p tw="mt-3 text-2xl">
          Get started by editing{' '}
          <code tw="p-3 font-mono text-lg bg-gray-100 rounded-md">
            src/app/page.tsx
          </code>
        </p>
        <div tw="mt-6 flex space-x-4">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes?? It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Container>
  )
}
