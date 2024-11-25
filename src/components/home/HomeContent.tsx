'use client'

import * as React from "react"
import { Navbar } from "@/components/layout";
import { Hero } from "@/components/home/sections/hero/Hero";
import { Pricing } from "@/components/pricing/Pricing";
import { Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/shared/navigation/ScrollToTop";
import { Features } from "@/components/home/sections/features";
import { FAQ } from "@/components/home/sections/faq/FAQ";

export function HomeContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
} 