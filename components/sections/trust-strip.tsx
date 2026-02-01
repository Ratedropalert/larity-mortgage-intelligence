"use client";

import { ShieldCheck, MailX, Calculator } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

const trustItems = [
    {
        icon: ShieldCheck,
        title: "Privacy-first protocol",
        desc: "Your financial data is encrypted and used only for monitoring. We never sell your metadata to lenders."
    },
    {
        icon: MailX,
        title: "Zero signal noise",
        desc: "We are an analytics protocol, not a broker. No marketing calls, no spam emails, just pure data."
    },
    {
        icon: Calculator,
        title: "Clear, objective math",
        desc: "Our revenue is independent of which lender you choose. Our only goal is identifying your savings."
    }
];

export function TrustStrip() {
    return (
        <section className="pt-48 pb-40 border-t border-gray-100 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {trustItems.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.1} direction="up">
                            <div className="group flex flex-col gap-8 p-1">
                                <div className="size-16 relative">
                                    <div className="absolute inset-0 bg-brand-accent/5 rounded-2xl group-hover:scale-110 transition-transform duration-500" />
                                    <div className="relative size-full flex items-center justify-center text-brand-accent">
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-brand-text tracking-tight uppercase tracking-[0.1em]">
                                        {item.title}
                                    </h3>
                                    <p className="text-[17px] text-brand-muted leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-48 pt-16 border-t border-gray-100">
                    <p className="text-[13px] text-brand-muted text-center italic tracking-widest max-w-4xl mx-auto leading-loose opacity-60 uppercase font-bold">
                        Clarity Intelligence is an independent monitoring service • mathematical analysis • non-broker protocol • privacy guaranteed
                    </p>
                </div>
            </div>
        </section>
    );
}
