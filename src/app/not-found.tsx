'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { config } from "@/config"
export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleContactSupport = () => {
    window.open(
      `mailto:${config.resend.support.email}?subject=Need help with ${config.appName}`,
      "_blank"
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Card className="relative w-full max-w-3xl bg-card/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="space-y-4 text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-extrabold leading-tight"  // Added leading-tight
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Oops!
                <span
                  className="block bg-gradient-to-r from-[#ff9a15] to-[#e26215] text-transparent bg-clip-text leading-normal"  // Added leading-normal
                >
                  Page Not Found
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                We've searched high and low, but couldn't find the page you're looking for.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button asChild size="lg">
                  <Link href="/">Take Me Home</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleContactSupport}
                >
                  Contact Support
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="w-64 h-64 relative"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary"
              >
                <path
                  d="M47.5,-57.2C59.5,-46.6,66,-29.9,68.1,-13.1C70.2,3.7,67.9,20.6,59.3,33.3C50.7,46,35.8,54.4,19.5,60.3C3.3,66.3,-14.2,69.7,-30.4,65.3C-46.6,60.9,-61.4,48.6,-69.7,32.5C-78,16.4,-79.8,-3.5,-73.3,-19.8C-66.8,-36.1,-52,-48.8,-37,-57.1C-22,-65.4,-6.8,-69.3,8.9,-69.1C24.6,-68.9,35.5,-67.8,47.5,-57.2Z"
                  transform="translate(100 100)"
                />
              </svg>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-foreground text-9xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                404
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}