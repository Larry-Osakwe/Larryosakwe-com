'use client'
import * as React from "react"
import tw from 'twin.macro';
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Sponsors } from "@/components/Sponsors";
import { About } from "@/components/About/About";
import { HowItWorks } from "@/components/HowItWorks";

const Container = tw.div`flex flex-col items-center justify-center min-h-screen py-2`;

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Sponsors />
    <About />
    <HowItWorks />
    <Container>
      hi
    </Container>
    </>
  );
}


