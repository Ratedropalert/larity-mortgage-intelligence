"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { HeroSection } from "@/components/sections/hero-section";
import { PinnedStory } from "@/components/sections/pinned-story";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => lenis.destroy();
    }
  }, []);

  return (
    <div className="bg-brand-bg relative selection:bg-brand-accent/20">
      <HeroSection />
      <PinnedStory />
      <TrustStrip />
      <FinalCTA />
    </div>
  );
}
