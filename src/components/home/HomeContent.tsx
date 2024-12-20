'use client'

import * as React from "react"
import { Navbar } from "@/components/layout";
import { Hero } from "@/components/home/sections/hero/Hero";
import { Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/shared/navigation/ScrollToTop";
import { Newsletter } from "@/components/home/sections/newsletter/Newsletter";
import { Services } from "@/components/home/sections/services/Services";
import { Pricing } from "@/components/pricing";
import { Projects } from "@/components/home/sections/projects/Projects";

export function HomeContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Projects />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </>
  );
} 