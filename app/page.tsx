"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Scene3D } from "@/components/three/Scene3D";
import { HeroSection } from "@/components/sections/hero-section";
import { PinnedStory } from "@/components/sections/pinned-story";
import { TrustStrip } from "@/components/sections/trust-strip";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 1.2,
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
      <Scene3D />
      <div className="relative z-10 pt-20"> {/* Header spacing fix */}
        <HeroSection />
        <PinnedStory />
        <TrustStrip />
        <FinalCTA />
      </div>
    </div>
  );
}
