"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { FloatingCard3D } from "@/components/three/FloatingCard3D";

export function HeroSection() {
    const scrollToStory = () => {
        const story = document.getElementById("scroll-story");
        story?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            className="bg-brand-bg overflow-hidden relative"
            style={{ paddingTop: '160px', paddingBottom: '160px' }}
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

                    {/* Left Column: Text Content */}
                    <FadeIn direction="up">
                        <div className="max-w-[600px] z-10">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/5 border border-brand-accent/10 mb-8">
                                <span className="size-2 rounded-full bg-brand-accent animate-pulse" />
                                <span className="text-[12px] font-bold text-brand-accent tracking-widest uppercase">Protocol CLR_V3 Active</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-[48px] md:text-[80px] leading-[0.9] tracking-[-0.04em] font-black text-brand-text mb-10">
                                Better math.<br />
                                Lower <span className="text-brand-accent italic">rates.</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-[18px] md:text-[22px] leading-[1.6] text-brand-muted max-w-[500px] font-light mb-16">
                                We monitor global market yields against your specific loan profile. You only move forward when the logic is undeniable.
                            </p>

                            {/* CTA Group */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link href="/signup" className="group bg-brand-text text-white px-10 h-16 rounded-2xl flex items-center gap-3 font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/10">
                                    Start monitoring
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    onClick={scrollToStory}
                                    className="text-brand-text font-bold px-8 h-16 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    See the story
                                    <ArrowDown size={14} />
                                </button>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right Column: 3D Scene */}
                    <FadeIn direction="up" delay={0.2}>
                        <div className="relative isolate px-4 md:px-0">
                            {/* Glow behind the scene */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-accent/10 blur-[120px] rounded-full -z-10" />

                            <div className="w-full">
                                <FloatingCard3D />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
