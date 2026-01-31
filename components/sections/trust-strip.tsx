"use client";

import { ShieldCheck, MailX, Calculator } from "lucide-react";

export function TrustStrip() {
    return (
        <section className="pt-40 pb-40 border-t border-gray-100 bg-[#FFFFFF]">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {[
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
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col gap-10 p-1">
                            <div className="size-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-accent mb-2">
                                <item.icon size={28} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-[22px] font-semibold text-brand-text tracking-tight uppercase tracking-[0.05em]">{item.title}</h3>
                                <p className="text-[16px] text-brand-muted leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-40 pt-16 border-t border-gray-50 pb-20">
                    <p className="text-[13px] text-brand-muted text-center italic tracking-wide max-w-4xl mx-auto leading-relaxed opacity-70">
                        Clarity Intelligence is an independent monitoring service. We provide mathematical analysis based on publicly available market rates.
                        Savings estimates are illustrative and subject to individual credit verification.
                    </p>
                </div>
            </div>
        </section>
    );
}
