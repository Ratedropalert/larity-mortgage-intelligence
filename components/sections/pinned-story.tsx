"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const storyBeats = [
    {
        id: "beat-a",
        title: "Paying a high rate feels like leaking money.",
        sub: "Every percentage point is personal capital that could be building your future, not the bank’s.",
        rate: 7.25,
        savings: 0,
        color: "#EF4444",
        bg: "radial-gradient(circle at 80% 20%, #FEF2F2 0%, #F9FAFB 100%)"
    },
    {
        id: "beat-b",
        title: "Rates move. Most people miss the moment.",
        sub: "The market shifts 24/7. Monitoring it manually is impossible. Missing the drop by a week can cost thousands.",
        rate: 6.85,
        savings: 112,
        color: "#F59E0B",
        bg: "radial-gradient(circle at 80% 20%, #FFFBEB 0%, #F9FAFB 100%)"
    },
    {
        id: "beat-c",
        title: "When the rate drops, savings become real.",
        sub: "Our surveillance algorithm identifies the precise intersection of market yield and your specific loan profile.",
        rate: 5.75,
        savings: 312,
        color: "#0D9488",
        bg: "radial-gradient(circle at 80% 20%, #F0FDFA 0%, #F9FAFB 100%)"
    },
    {
        id: "beat-d",
        title: "Relief and control: you act with confidence.",
        sub: "Neutral data gives you the upper hand. Clarity moves you from a passive payer to an active capital manager.",
        rate: 5.75,
        savings: 312,
        color: "#0D9488",
        bg: "radial-gradient(circle at 80% 20%, #F0FDFA 0%, #F9FAFB 100%)"
    }
];

export function PinnedStory() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const rateRef = useRef<HTMLDivElement>(null);
    const savingsRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const sweepRef = useRef<HTMLDivElement>(null);

    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useGSAP(() => {
        if (prefersReducedMotion || typeof window === 'undefined') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${storyBeats.length * 100}%`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        // Master 3D Tilt & Sweep (Global for the pinned sequence)
        tl.to(cardRef.current, {
            rotationY: 8,
            rotationX: 2,
            duration: storyBeats.length,
            ease: "none"
        }, 0);

        tl.to(sweepRef.current, {
            xPercent: 150,
            duration: storyBeats.length,
            ease: "none"
        }, 0);

        storyBeats.forEach((beat, i) => {
            // Text Transitions
            tl.to(`.story-text-${i}`, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, i === 0 ? 0 : ">-0.2");

            // Number Tweens
            tl.to(rateRef.current, {
                innerText: beat.rate,
                color: beat.color,
                duration: 1,
                snap: { innerText: 0.01 },
                onUpdate: function () {
                    if (rateRef.current) {
                        rateRef.current.innerText = parseFloat(this.targets()[0].innerText).toFixed(2) + "%";
                    }
                },
                ease: "none"
            }, i === 0 ? 0 : "<");

            tl.to(savingsRef.current, {
                innerText: beat.savings,
                duration: 1,
                snap: { innerText: 1 },
                onUpdate: function () {
                    if (savingsRef.current) {
                        savingsRef.current.innerText = "$" + parseInt(this.targets()[0].innerText);
                    }
                },
                ease: "none"
            }, i === 0 ? 0 : "<");

            // Background Tone
            tl.to(bgRef.current, {
                background: beat.bg,
                duration: 1,
                ease: "none"
            }, i === 0 ? 0 : "<");

            // Card Depth - Subtle Shadow Shift
            tl.to(cardRef.current, {
                boxShadow: `0 40px 120px rgba(0,0,0,${0.02 + (i * 0.005)})`,
                duration: 1,
                ease: "none"
            }, i === 0 ? 0 : "<");

            if (i < storyBeats.length - 1) {
                tl.to(`.story-text-${i}`, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power2.in"
                }, ">+0.3");
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: triggerRef, dependencies: [prefersReducedMotion] });

    if (prefersReducedMotion) {
        return (
            <div id="scroll-story" className="bg-brand-bg py-24">
                <div className="container-custom space-y-32">
                    {storyBeats.map((beat) => (
                        <div key={beat.id} className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-6">
                                <h2 className="text-brand-text">{beat.title}</h2>
                                <p className="text-lg text-brand-muted">{beat.sub}</p>
                            </div>
                            <div className="card p-12 max-w-sm border-gray-100">
                                <div className="text-center space-y-4">
                                    <div className="text-4xl font-bold" style={{ color: beat.color }}>{beat.rate}%</div>
                                    <div className="text-[11px] font-bold text-brand-muted uppercase tracking-widest">Savings: ${beat.savings}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div ref={triggerRef} id="scroll-story" className="relative overflow-hidden">
            <div ref={bgRef} className="absolute inset-0 bg-brand-bg pointer-events-none transition-colors duration-1000" />

            <div ref={containerRef} className="h-screen flex items-center relative z-10">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-24 items-center h-full">

                        <div className="relative h-[300px]">
                            {storyBeats.map((beat, i) => (
                                <div
                                    key={beat.id}
                                    className={`story-text-${i} absolute inset-0 flex flex-col justify-center space-y-8 opacity-0 translate-y-10`}
                                >
                                    <h2 className="text-brand-text leading-tight">{beat.title}</h2>
                                    <p className="text-lg text-brand-muted leading-relaxed max-w-md italic font-light">
                                        "{beat.sub}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="perspective-container">
                            <div ref={cardRef} className="card-3d card max-w-md mx-auto p-12 lg:p-16 bg-white border-gray-100/60 shadow-[0_32px_100px_rgba(0,0,0,0.02)] relative overflow-hidden">
                                {/* Highlight Sweep Element */}
                                <div ref={sweepRef} className="highlight-sweep absolute inset-0 -translate-x-full z-0" />

                                <div className="relative z-10 space-y-12">
                                    <div className="space-y-3 pb-8 border-b border-gray-50 text-center">
                                        <span className="text-[12px] font-bold text-brand-muted uppercase tracking-[0.3em]">Surveillance Node</span>
                                        <div ref={rateRef} className="text-[80px] font-bold tracking-tighter transition-colors">7.25%</div>
                                    </div>

                                    <div className="flex justify-between items-center px-4">
                                        <div className="space-y-2">
                                            <span className="text-[11px] font-bold text-brand-muted uppercase tracking-widest">Savings Generated</span>
                                            <div ref={savingsRef} className="text-3xl font-bold text-brand-text tracking-tight">$0</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                                                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Status: Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
