'use client'

import * as React from "react"
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";

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