'use client'
import * as React from "react"
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Sponsors } from "@/components/Sponsors";
import { About } from "@/components/About/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { CTA } from "@/components/CTA";
import { Testimonials } from "@/components/Testimonials";
import { Team } from "@/components/Team";
import { Pricing } from "@/components/Pricing";
import { Newsletter } from "@/components/Newsletter";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Sponsors />
    <About />
    <HowItWorks />
    <Features />
    <Services />
    <CTA />
    <Testimonials />
    <Team />
    <Pricing />
    <Newsletter />
    <FAQ />
    <Footer />
    hi. hello. goodbye
    <ScrollToTop />
    </>
  );
}


