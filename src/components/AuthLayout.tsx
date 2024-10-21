import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { LogoIcon } from "@/components/Icons"
import { config } from '../../config'


interface AuthLayoutProps {
  children: React.ReactNode
  showImage?: boolean
  heading: string
  subheading: string
}

export function AuthLayout({ children, showImage = true, heading, subheading }: AuthLayoutProps) {
  return (
    <div className={`container relative min-h-screen flex flex-col items-center justify-center ${showImage ? 'md:grid lg:max-w-none lg:grid-cols-2 lg:px-0' : ''}`}>
      {showImage ? (
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/auth-background.jpg"
              alt="Authentication background"
              width={1280}
              height={843}
              className="object-cover w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-zinc-900 opacity-50" />
          </div>
          <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
            <LogoIcon />
            {config.appName}
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
      ) : null}
      <div className={`${showImage ? 'lg:p-8' : 'w-full'}`}>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {!showImage && (
            <div className="flex items-center justify-center mb-4">
              <LogoIcon />
              <span className="ml-2 text-2xl font-bold">{config.appName}</span>
            </div>
          )}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {heading}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subheading}
            </p>
          </div>
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
