"use client";

import { useRef, useState, dynamic } from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck, MailX, Calculator } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FadeIn } from "@/components/motion/fade-in";

// Dynamically import 3D component to avoid SSR issues
const RateViz = dynamic(() => import("@/components/motion/rate-viz"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-muted/10 animate-pulse rounded-3xl" />
});

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  // States for 3D animation
  const [vizData, setVizData] = useState({
    rate: 7.5,
    payment: 2450,
    color: "#94a3b8" // Slate
  });

  useGSAP(() => {
    const sections = gsap.utils.toArray(".story-section");

    ScrollTrigger.create({
      trigger: storyRef.current,
      start: "top top",
      end: `+=${(sections.length - 1) * 100}%`,
      pin: true,
      scrub: 1,
    });

    const animProxy = { rate: 7.5, payment: 2450 };

    gsap.to(animProxy, {
      rate: 5.2,
      payment: 1820,
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          let color = "#94a3b8"; // Default
          if (self.progress > 0.3) color = "#818cf8"; // Indigo
          if (self.progress > 0.6) color = "#22c55e"; // Green

          setVizData({
            rate: animProxy.rate,
            payment: Math.round(animProxy.payment),
            color: color
          });
        }
      }
    });

    sections.forEach((section: any, i: number) => {
      const content = section.querySelector(".section-content");

      if (i > 0) {
        gsap.set(section, { position: "absolute", top: 0, left: 0, width: "100%", opacity: 0 });

        gsap.to(section, {
          opacity: 1,
          scrollTrigger: {
            trigger: storyRef.current,
            start: `${(i / sections.length) * 100}% top`,
            end: `${((i + 0.5) / sections.length) * 100}% top`,
            scrub: 1,
          }
        });

        if (content) {
          gsap.from(content, {
            y: 40,
            opacity: 0,
            scrollTrigger: {
              trigger: storyRef.current,
              start: `${(i / sections.length) * 100}% top`,
              end: `${((i + 0.3) / sections.length) * 100}% top`,
              scrub: 1,
            }
          });
        }
      }

      const gradients = [
        "radial-gradient(circle at 50% 50%, rgba(148, 163, 184, 0.04), transparent)",
        "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04), transparent)",
        "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.04), transparent)",
        "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.06), transparent)",
      ];

      if (i < sections.length) {
        gsap.to(containerRef.current, {
          background: gradients[i],
          scrollTrigger: {
            trigger: storyRef.current,
            start: `${(i / sections.length) * 100}% top`,
            end: `${((i + 1) / sections.length) * 100}% top`,
            scrub: 1,
          }
        });
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col w-full transition-colors duration-1000">
      {/* Hero Section */}
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.06),rgba(255,255,255,0))]" />

        <FadeIn direction="up">
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:leading-[1.1]">
            Experience clarity in your <br className="hidden sm:block" />
            <span className="text-accent underline decoration-accent/10 underline-offset-8">financial journey.</span>
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl font-light leading-relaxed">
            Quiet confidence comes from knowing the math. We monitor the market
            to ensure you never miss a meaningful opportunity to save.
          </p>
          <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-accent px-12 py-5 text-lg font-semibold text-accent-foreground shadow-2xl shadow-accent/10 transition-all hover:scale-[1.02] hover:shadow-accent/20 active:scale-95 focus:ring-4 focus:ring-accent/20 outline-none"
            >
              Get rate alerts
            </Link>
            <button
              onClick={() => {
                storyRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2 rounded-full border border-border bg-background/40 px-12 py-5 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-muted/50 active:scale-95 focus:ring-4 focus:ring-muted/20 outline-none"
            >
              How it works
              <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Pinned Story Container */}
      <div ref={storyRef} className="relative w-full h-screen overflow-hidden bg-background">

        {/* Persistent 3D Visualization */}
        <div className="absolute inset-0 z-0 flex items-center justify-end pr-8 md:pr-24 lg:pr-32 pointer-events-none">
          <div className="w-full max-w-xl h-[600px] opacity-100 transition-opacity duration-500">
            <RateViz {...vizData} />
          </div>
        </div>

        {/* Section A: High Rate Pressure */}
        <section className="story-section absolute inset-0 z-10 flex h-screen w-full items-center justify-start px-4 md:px-24 lg:px-32">
          <div className="container mx-auto">
            <div className="section-content max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/50 mb-6 block font-mono">The Foundation</span>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-8 leading-[1.1]">
                Perspective on <br />your current rate.
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Many homeowners remain anchored to rates that no longer align with the market.
                Breaking free from high interest requires more than monitoring—it requires intent.
              </p>
            </div>
          </div>
        </section>

        {/* Section B: Rates Drop */}
        <section className="story-section absolute inset-0 z-10 opacity-0 flex h-screen w-full items-center justify-start px-4 md:px-24 lg:px-32">
          <div className="container mx-auto">
            <div className="section-content max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/50 mb-6 block font-mono">The Intelligence</span>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-8 leading-[1.1]">
                Gentle alerts, <br />precisely timed.
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                The market breathes. We filter through the noise to notify you only
                when a shift occurs that genuinely benefits your unique position.
              </p>
            </div>
          </div>
        </section>

        {/* Section C: Savings Opportunity */}
        <section className="story-section absolute inset-0 z-10 opacity-0 flex h-screen w-full items-center justify-start px-4 md:px-24 lg:px-32">
          <div className="container mx-auto">
            <div className="section-content max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/50 mb-6 block font-mono">The Clarity</span>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-8 leading-[1.1]">
                Transparency <br />in every decimal.
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                We translate basis points into tangible monthly impact.
                Full transparency ensures you have the control to make informed decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Section D: Relief & Control */}
        <section className="story-section absolute inset-0 z-10 opacity-0 flex h-screen w-full items-center justify-center bg-background px-4 text-center">
          <div className="section-content container mx-auto max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/50 mb-6 block font-mono">The Outcome</span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-7xl mb-10 leading-[1.1]">
              Quiet confidence <br />is automated.
            </h2>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed mb-14 max-w-2xl mx-auto">
              Reclaim your time while our systems protect your financial future.
              The most sophisticated technology is the one you don't have to notice.
            </p>
            <Link
              href="/signup"
              className="inline-block rounded-full bg-accent px-14 py-6 text-xl font-bold text-accent-foreground shadow-2xl shadow-accent/10 transition-all hover:scale-[1.02] hover:shadow-accent/20 active:scale-95 focus:ring-4 focus:ring-accent/20 outline-none"
            >
              Secure your alerts
            </Link>
          </div>
        </section>
      </div>

      {/* Trust Section */}
      <section className="w-full bg-background py-40 border-t border-border mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                icon: <MailX className="text-accent" />,
                title: "Pure Integrity",
                desc: "We communicate only when it matters. No noise, no marketing, no exceptions."
              },
              {
                icon: <ShieldCheck className="text-accent" />,
                title: "Privacy-First",
                desc: "Your data remains your own. Encrypted, secure, and never for sale."
              },
              {
                icon: <Calculator className="text-accent" />,
                title: "Unbiased Logic",
                desc: "Our math is clear and consistent, providing the unbiased truth of your savings."
              }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-[2rem] border border-border bg-muted/5 hover:bg-muted/10 transition-all duration-500 ease-out group">
                <div className="mb-8 size-14 flex items-center justify-center rounded-2xl bg-accent/5 group-hover:bg-accent/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed text-lg">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-24 text-center text-xs text-muted-foreground/60 max-w-3xl mx-auto italic font-light space-y-2">
            <p>This platform provides informational analysis based on market averages and does not constitute financial, legal, or investment advice.</p>
            <p>Mortgage rates and eligibility are subject to external market conditions and individual qualification criteria.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="w-full bg-foreground text-background py-40">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-10 leading-[1.1]">
            Start your journey <br />towards financial control.
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-background/60 mb-14 font-light leading-relaxed">
            Join our quiet community of informed homeowners. Set your target rate once, and let us handle the rest with precision.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-full bg-accent px-14 py-6 text-xl font-bold text-accent-foreground transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-accent/30 focus:ring-4 focus:ring-accent/20 outline-none"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
}
