"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

export function FinalCTA() {
    return (
        <section className="py-64 bg-black text-white relative overflow-hidden">
            {/* Massive background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[20vw] font-black whitespace-nowrap tracking-tighter">
                CLARITY
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-brand-accent/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-brand-accent/10 blur-[200px] rounded-full mix-blend-screen" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl space-y-16">
                    <FadeIn direction="up">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                <Shield size={16} className="text-brand-accent" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Protocol Status: Ready</span>
                            </div>
                            <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[1] text-white">
                                Secure your financial <span className="text-brand-accent italic font-medium">baseline.</span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-white/40 leading-relaxed max-w-2xl font-medium italic">
                                "Experience the relief of having a protocol that works quietly in the background, only surfacing when the math changes in your favor."
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.2}>
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-8">
                            <Link href="/signup" className="group bg-brand-accent hover:bg-brand-accent/90 text-white px-12 py-6 text-lg font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(13,148,136,0.3)] flex items-center gap-4">
                                Establish Surveillance
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/" className="text-white/60 hover:text-white px-12 py-6 text-lg font-bold transition-colors">
                                Learn about privacy
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
