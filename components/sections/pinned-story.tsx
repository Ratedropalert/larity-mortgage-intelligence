"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const storyBeats = [
    {
        id: "beat-1",
        title: "When mortgage rates drop...",
        sub: "The market shifts in your favor. But opportunity is fleeting.",
        image: "/images/story-1.png",
        color: "#10B981"
    },
    {
        id: "beat-2",
        title: "You get notified instantly.",
        sub: "No manual tracking. No missed moments. Decide if it makes sense for you.",
        image: "/images/story-2.png",
        color: "#3B82F6"
    },
    {
        id: "beat-3",
        title: "The benefits are clear.",
        sub: "Lower payments. zero closing fees. Total financial clarity.",
        image: "/images/story-3.png",
        color: "#8B5CF6"
    },
    {
        id: "beat-4",
        title: "You stay in control.",
        sub: "Move forward only when it feels right. Your equity, protected.",
        image: "/images/story-4.png",
        color: "#F59E0B"
    }
];

export function PinnedStory() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (typeof window === "undefined") return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${storyBeats.length * 100}%`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        const imageSegments = gsap.utils.toArray(".story-image-item");
        const contentSegments = gsap.utils.toArray(".story-content-item");

        imageSegments.forEach((img, i) => {
            if (i === 0) {
                // Initial state for first image
                gsap.set(img as any, { opacity: 1, scale: 1, z: 0 });
                gsap.set(contentSegments[i] as any, { opacity: 1, y: 0 });
            } else {
                gsap.set(img as any, { opacity: 0, scale: 1.1, z: -100 });
                gsap.set(contentSegments[i] as any, { opacity: 0, y: 50 });
            }
        });

        storyBeats.forEach((_, i) => {
            if (i < storyBeats.length - 1) {
                // Transition OUT current
                tl.to(imageSegments[i] as any, {
                    opacity: 0,
                    scale: 0.9,
                    z: 50,
                    duration: 1,
                    ease: "power2.inOut"
                }, i);

                tl.to(contentSegments[i] as any, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power2.in"
                }, i);

                // Transition IN next
                tl.to(imageSegments[i + 1] as any, {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    duration: 1,
                    ease: "power2.inOut"
                }, i + 0.2);

                tl.to(contentSegments[i + 1] as any, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, i + 0.4);
            }
        });

        // Add a subtle parallax effect on mouse move for the active image
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(".story-image-container", {
                rotationY: xPos,
                rotationX: -yPos,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative h-screen overflow-hidden bg-black text-white">
            <div ref={pinRef} className="relative h-full w-full flex items-center justify-center overflow-hidden">
                
                {/* 3D Image Stack */}
                <div className="absolute inset-0 z-0 perspective-2000 pointer-events-none">
                    <div className="story-image-container w-full h-full relative preserve-3d">
                        {storyBeats.map((beat, i) => (
                            <div
                                key={beat.id}
                                className="story-image-item absolute inset-0 flex items-center justify-center opacity-0"
                            >
                                <div className="relative w-full h-full opacity-60">
                                    <Image
                                        src={beat.image}
                                        alt={beat.title}
                                        fill
                                        className="object-cover"
                                        priority={i === 0}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center pointer-events-none">
                    <div className="space-y-12">
                        {storyBeats.map((beat, i) => (
                            <div
                                key={`${beat.id}-content`}
                                className="story-content-item absolute inset-0 flex flex-col justify-center max-w-xl opacity-0"
                            >
                                <div 
                                    className="w-12 h-1 mb-8" 
                                    style={{ backgroundColor: beat.color }}
                                />
                                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
                                    {beat.title}
                                </h2>
                                <p className="text-xl lg:text-2xl text-white/60 font-medium leading-relaxed">
                                    {beat.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="hidden lg:block">
                        {/* Placeholder for a 3D secondary element or just empty for balance */}
                    </div>
                </div>

            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Scroll Story</span>
                <div className="w-px h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
                </div>
            </div>
        </section>
    );
}
