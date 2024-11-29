'use client'

import * as React from "react"
import { Navbar } from "@/components/layout";
import { Hero } from "@/components/home/sections/hero/Hero";
import { Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/shared/navigation/ScrollToTop";
import { Newsletter } from "./sections/newsletter/Newsletter";

export function HomeContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <Newsletter />
      <Footer />
      <ScrollToTop />
    </>
  );
} 