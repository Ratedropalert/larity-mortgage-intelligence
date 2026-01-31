"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
    return (
        <section className="py-64 bg-brand-bg relative overflow-hidden">
            {/* Subtle decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/[0.02] blur-[150px] pointer-events-none" />

            <div className="container-custom relative z-10 text-left">
                <div className="max-w-3xl space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-brand-text">Secure your financial baseline.</h2>
                        <p className="text-lg lg:text-xl text-brand-muted leading-relaxed font-light italic">
                            "Experience the relief of having a protocol that works quietly in the background, only surfacing when the math changes in your favor."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-start gap-6">
                        <Link href="/signup" className="btn-primary px-12 py-5 text-base shadow-xl shadow-brand-accent/10">
                            Establish Surveillance
                            <ArrowRight size={18} className="ml-3" />
                        </Link>
                        <Link href="/" className="btn-secondary px-12 py-5 text-base">
                            Learn about privacy
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
