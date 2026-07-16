'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Pricing from '@/components/home/Pricing';
import CTA from '@/components/home/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 dark:bg-[#050505] dark:text-white">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />
      {/* FEATURES */}
      <Features />
      {/* HOW IT WORKS */}
      <HowItWorks />
      {/* PRICING */}
      <Pricing />
      {/* CTA */}
      <CTA />
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
