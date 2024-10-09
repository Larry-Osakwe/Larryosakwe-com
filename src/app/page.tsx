'use client'

import tw from 'twin.macro';

const Container = tw.div`flex flex-col items-center justify-center min-h-screen py-2`

export default function Home() {
  return (
    <Container>
      <main>
        <h1 tw="text-6xl font-bold">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p tw="mt-3 text-2xl">
          Get started by editing{' '}
          <code tw="p-3 font-mono text-lg bg-gray-100 rounded-md">
            src/app/page.tsx
          </code>
        </p>
      </main>
    </Container>
  )
}
