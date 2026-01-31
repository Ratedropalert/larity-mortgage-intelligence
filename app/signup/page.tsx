"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    Info,
    AlertCircle
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const [targetRate, setTargetRate] = useState(5.75);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        zip: "",
        currentRate: "",
        loanBalance: "",
        homeType: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        zip_code: formData.zip,
                        target_rate: targetRate,
                        current_rate: formData.currentRate,
                        loan_balance: formData.loanBalance,
                        home_type: formData.homeType,
                    },
                },
            });

            if (signUpError) throw signUpError;

            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen pt-40 pb-20 bg-brand-bg flex items-center justify-center">
                <div className="container-custom max-w-xl text-center">
                    <FadeIn direction="up">
                        <div className="size-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-teal-100">
                            <CheckCircle2 className="size-10 text-brand-accent" />
                        </div>
                        <h1 className="mb-6">Surveillance Active.</h1>
                        <div className="space-y-6 mb-12">
                            <p className="text-brand-muted lg:text-lg">
                                We've initialized your mortgage monitoring node. Please check your email to confirm your account. You'll receive a secure notification the moment average rates hit <span className="text-brand-text font-bold">{targetRate}%</span> or lower.
                            </p>
                            <div className="bg-white border border-brand-border p-6 rounded-2xl text-left space-y-4">
                                <h4 className="text-[14px] font-bold text-brand-text uppercase tracking-wider">Next Steps:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-brand-muted">
                                        <span className="flex-shrink-0 size-5 bg-teal-50 text-brand-accent rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                                        Check your inbox for a confirmation link.
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-brand-muted">
                                        <span className="flex-shrink-0 size-5 bg-teal-50 text-brand-accent rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                                        Our engine will now begin 24/7 analysis of global yield benchmarks.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link href="/" className="btn-primary px-10">
                            Return to Workspace
                        </Link>
                    </FadeIn>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-20 bg-brand-bg lg:pt-40">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Left Side: Reassurance */}
                    <div className="space-y-12">
                        <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-accent group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to overview
                        </Link>

                        <div className="space-y-8">
                            <h1 className="">Stop overpaying <br /><span className="text-brand-accent italic font-medium">by default.</span></h1>
                            <p className="text-xl text-brand-muted leading-relaxed max-w-lg">
                                Automate your financial monitoring. We track the numbers quietly in the background, only surfacing when the math works for you.
                            </p>
                        </div>

                        <div className="space-y-10 pt-4">
                            <h4 className="text-[13px] font-bold text-brand-text uppercase tracking-widest">What you'll get:</h4>
                            <ul className="space-y-8">
                                {[
                                    { title: "24/7 Passive Surveillance", desc: "Our engine tracks minute-by-minute fluctuations while you sleep." },
                                    { title: "Neutral Analysis", desc: "No lender bias. We don't sell your data to banks or lead generators." },
                                    { title: "Real-time Delta Alerts", desc: "Instant notification when market yield hits your target threshold." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="flex-shrink-0 size-6 bg-teal-50 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={16} className="text-brand-accent" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[16px] font-bold text-brand-text">{item.title}</p>
                                            <p className="text-[15px] text-brand-muted leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Side: Form Card */}
                    <FadeIn direction="up">
                        <div className="card shadow-2xl shadow-gray-200/40 p-8 md:p-12 border-0">
                            <form onSubmit={handleSubmit} className="space-y-10">

                                {/* Target Rate Selector */}
                                <div className="space-y-8 pb-8 border-b border-gray-50">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <label className="mb-0">Target Yield (%)</label>
                                            <p className="text-[12px] text-brand-muted font-medium flex items-center gap-1.5">
                                                <Info size={12} className="text-brand-accent" />
                                                Threshold for alert
                                            </p>
                                        </div>
                                        <span className="text-5xl font-bold text-brand-text tracking-tighter">{targetRate.toFixed(3)}%</span>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min="2.5"
                                            max="9.5"
                                            step="0.125"
                                            value={targetRate}
                                            onChange={(e) => setTargetRate(parseFloat(e.target.value))}
                                        />
                                        <div className="flex justify-between text-[11px] font-bold text-brand-muted uppercase tracking-[0.1em]">
                                            <span>Aggressive</span>
                                            <span>Conservative</span>
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-brand-muted italic leading-relaxed">
                                        “We’ll notify you when average rates hit this level or lower.”
                                    </p>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="name@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label>Create Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            placeholder="••••••••"
                                            minLength={6}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label>ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            required
                                            placeholder="90210"
                                            value={formData.zip}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label>Current Rate (%)</label>
                                        <input
                                            type="number"
                                            name="currentRate"
                                            step="0.125"
                                            placeholder="7.500"
                                            value={formData.currentRate}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label>Loan Balance</label>
                                        <select
                                            name="loanBalance"
                                            value={formData.loanBalance}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select range</option>
                                            <option value="<250k">&lt; $250k</option>
                                            <option value="250-500k">$250k - $500k</option>
                                            <option value="500-750k">$500k - $750k</option>
                                            <option value="750k+">$750k +</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label>Home Type</label>
                                        <select
                                            name="homeType"
                                            value={formData.homeType}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select type</option>
                                            <option value="primary">Primary Residence</option>
                                            <option value="secondary">Second Home</option>
                                            <option value="investment">Investment Property</option>
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-8 pt-4">
                                    <label className="flex items-start gap-4 cursor-pointer group normal-case font-normal text-brand-muted mb-0">
                                        <input type="checkbox" required className="flex-shrink-0 size-5 mt-1 border border-brand-border rounded-lg accent-brand-accent cursor-pointer" />
                                        <span className="text-[14px] leading-relaxed group-hover:text-brand-text transition-colors">
                                            I authorize 24/7 surveillance of my financial efficiency. I understand Clarity is an analytics-only protocol.
                                        </span>
                                    </label>

                                    <div className="space-y-4 text-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full btn-primary py-5 text-base shadow-xl shadow-brand-accent/10 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Generating Node..." : "Initiate Surveillance"}
                                        </button>
                                        <p className="text-[13px] text-brand-muted">
                                            Already have a terminal? <Link href="/signin" className="text-brand-accent font-bold hover:underline">Sign In</Link>
                                        </p>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </FadeIn>

                </div>
            </div>
        </div>
    );
}
