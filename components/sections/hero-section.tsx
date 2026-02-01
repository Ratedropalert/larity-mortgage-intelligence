"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export function HeroSection() {
    const cardContainerRef = useRef<HTMLDivElement>(null);

    const scrollToStory = () => {
        const story = document.getElementById("scroll-story");
        story?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardContainerRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = cardContainerRef.current.getBoundingClientRect();

            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            gsap.to(cardContainerRef.current, {
                rotationY: x * 15,
                rotationX: -y * 15,
                transformPerspective: 1000,
                duration: 0.6,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            className="bg-brand-bg overflow-hidden relative"
            style={{ paddingTop: '240px', paddingBottom: '160px' }} // Hard-enforcing breathing room
        >
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">

                    {/* Left Column: Text Content */}
                    <FadeIn direction="up">
                        <div className="max-w-[600px]">

                            {/* Headline */}
                            <h1 className="text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.03em] font-extrabold text-brand-text">
                                Know exactly when to <span className="text-brand-accent italic font-medium">refinance.</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="mt-10 text-[18px] md:text-[21px] leading-[1.6] text-brand-muted max-w-[540px] font-light">
                                We watch the rates quietly in the background. You only hear from us when the math works in your favor.
                            </p>

                            {/* CTA Group */}
                            <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
                                <Link href="/signup" className="btn-primary w-full sm:w-auto h-14 px-10 text-[16px] shadow-xl shadow-brand-accent/10">
                                    Start rate tracking
                                    <ArrowRight size={18} className="ml-2" />
                                </Link>
                                <button
                                    onClick={scrollToStory}
                                    className="btn-secondary w-full sm:w-auto h-14 px-10 text-[16px] group"
                                >
                                    See how it works
                                    <ArrowDown size={14} className="ml-2 group-hover:translate-y-1 transition-transform" />
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="mt-16 flex items-center gap-5 opacity-80 mix-blend-multiply">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="size-12 rounded-full border-[3px] border-brand-bg bg-gray-100 overflow-hidden relative z-10 shadow-sm">
                                            <div className="w-full h-full bg-brand-accent/10 flex items-center justify-center text-[10px] font-bold text-brand-accent">
                                                U{i}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col justify-center space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="size-1.5 rounded-full bg-brand-accent animate-pulse" />
                                        <span className="text-[13px] font-bold text-brand-text tracking-wide">4,500+ joined</span>
                                    </div>
                                    <p className="text-[11px] text-brand-muted font-medium">Monitoring $2.5B in loans</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.2}>
                        <div className="relative isolate px-4 md:px-0"> {/* Added outer padding wrapper for mobile safety */}
                            {/* Subtle background glow */}
                            <div className="absolute -inset-20 bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none -z-10" />

                            <div
                                ref={cardContainerRef}
                                className="relative bg-white border border-brand-border p-6 md:p-12 shadow-[0_32px_120px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden max-w-[500px] md:max-w-xl mx-auto lg:max-w-none w-full preserve-3d"
                            >
                                <div className="space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] block">Current Node</span>
                                            <h4 className="text-[15px] md:text-[17px] font-bold text-brand-text truncate">Active Monitoring</h4>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 flex items-center gap-1.5 shrink-0 ml-4">
                                            <div className="size-1.5 bg-brand-accent rounded-full animate-pulse" />
                                            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Live</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 md:gap-12 border-y border-gray-100 py-6 md:py-10">
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest block">Current Rate</span>
                                            <div className="text-[26px] md:text-[36px] leading-none font-bold text-brand-text tracking-tight">7.24%</div>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest block">Target Threshold</span>
                                            <div className="text-[26px] md:text-[36px] leading-none font-bold text-brand-accent italic tracking-tight">5.75%</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-2">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block">Potential Optimization</span>
                                            <div className="text-[20px] md:text-[24px] font-bold text-brand-text tracking-tight">$312.42 <span className="text-brand-muted font-medium text-sm">/ mo</span></div>
                                        </div>
                                        <div className="h-px w-full sm:h-10 sm:w-px bg-gray-100 block" />
                                        <div className="space-y-1 sm:text-right">
                                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block">Protocol</span>
                                            <div className="text-[11px] md:text-[12px] font-mono text-brand-text font-bold">CLN_7721_V2</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating 3D elements inside card */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl -z-10" />
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
