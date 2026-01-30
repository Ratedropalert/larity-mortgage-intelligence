"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, BellRing } from "lucide-react";

export default function SignupPage() {
    const [targetRate, setTargetRate] = useState(5.5);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const zip = formData.get("zip") as string;
        const currentRate = formData.get("currentRate") as string;
        const loanRange = formData.get("loanRange") as string;
        const homeType = formData.get("homeType") as string;
        const agree = formData.get("agree");

        const newErrors: Record<string, string> = {};
        if (!email) newErrors.email = "Email is required";
        if (!zip) newErrors.zip = "ZIP code is required";
        if (!agree) newErrors.agree = "Please agree to receive alerts";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        setErrors({});

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    zip,
                    target_rate: targetRate,
                    current_rate: currentRate ? parseFloat(currentRate) : null,
                    balance_range: loanRange,
                    home_type: homeType,
                    consent: !!agree,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            setIsSubmitted(true);
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to submit. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-[85vh] items-center justify-center px-4 py-20 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.03),transparent)]">
                <FadeIn direction="up" className="w-full max-w-lg text-center">
                    <div className="rounded-[3rem] border border-border bg-white p-12 lg:p-16 shadow-2xl shadow-accent/5">
                        <div className="mb-10 flex justify-center">
                            <div className="size-20 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <CheckCircle2 size={40} />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-6">Clarity achieved.</h1>
                        <p className="text-xl text-muted-foreground mb-12 font-light">
                            We've saved your target of <span className="text-accent font-bold">{(+targetRate).toFixed(3)}%</span>.
                            You can now rest easy knowing we're watching the market for you.
                        </p>

                        <div className="bg-muted/30 rounded-[2rem] p-8 text-left mb-12 space-y-6">
                            <h3 className="font-bold text-lg flex items-center gap-3">
                                <Zap size={20} className="text-accent" />
                                What to expect
                            </h3>
                            <ul className="text-base text-muted-foreground space-y-4">
                                <li className="flex gap-4">
                                    <div className="size-2 rounded-full bg-accent mt-2 shrink-0" />
                                    <span>Institutional-grade monitoring of global rate trends 24/7.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="size-2 rounded-full bg-accent mt-2 shrink-0" />
                                    <span>A single, clear notification if and when your target is met.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="size-2 rounded-full bg-accent mt-2 shrink-0" />
                                    <span>Absolute privacy. No sales pressure, no shared data.</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/"
                            className="inline-block rounded-full bg-foreground px-12 py-5 font-bold text-background transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                    <p className="mt-12 text-muted-foreground/60 text-sm italic">
                        Verification email sent to your inbox.
                    </p>
                </FadeIn>
            </div>
        );
    }

    return (
        <div className="flex min-h-[90vh] flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 py-12 lg:py-24 gap-16 lg:gap-32">
            {/* Left Column: Reassurance */}
            <div className="flex-1 space-y-16 flex flex-col justify-center">
                <FadeIn direction="right">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-accent transition-all duration-300 mb-12 group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Clarity
                    </Link>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-7xl text-foreground leading-[1.1]">
                        Quiet confidence <br className="hidden sm:block" />
                        <span className="text-accent underline decoration-accent/10 underline-offset-8">starts here.</span>
                    </h1>
                    <p className="text-2xl text-muted-foreground font-light leading-relaxed max-w-xl mt-10">
                        Join an informed community of homeowners who prioritize logic over hype.
                        Your financial peace of mind is our only metric of success.
                    </p>

                    <div className="mt-16 grid gap-10">
                        <div className="flex gap-6 items-start group">
                            <div className="size-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/10 transition-colors">
                                <ShieldCheck size={28} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold">Absolute Privacy</h4>
                                <p className="text-muted-foreground font-light leading-relaxed">Your data is stored with bank-grade encryption and never sold.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="size-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/10 transition-colors">
                                <BellRing size={28} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold">Intentional Alerts</h4>
                                <p className="text-muted-foreground font-light leading-relaxed">We communicate only when it matters. No noise, just the truth.</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Right Column: Signup Card */}
            <div className="flex-1 flex items-center justify-center lg:justify-end">
                <FadeIn direction="left" className="w-full max-w-xl">
                    <div className="rounded-[3rem] border border-border bg-white p-10 lg:p-14 shadow-2xl shadow-accent/5">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Target Rate Selector */}
                            <div className="space-y-8 pb-8 border-b border-border/50">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                        Your Target
                                    </label>
                                    <span className="text-5xl font-bold text-accent tracking-tighter">
                                        {(+targetRate).toFixed(3)}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="2.5"
                                    max="9.5"
                                    step="0.125"
                                    value={targetRate}
                                    onChange={(e) => setTargetRate(parseFloat(e.target.value))}
                                    className="w-full accent-accent h-2 bg-muted rounded-lg appearance-none cursor-pointer focus:ring-4 focus:ring-accent/10 outline-none"
                                />
                                <p className="text-base text-muted-foreground font-light leading-relaxed italic text-center">
                                    "Notify me when institutional averages drop to this level."
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="grid gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className={`w-full rounded-2xl border ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-border bg-muted/20'} px-6 py-4 outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-lg font-light`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 font-bold tracking-wide pl-2">{errors.email}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label htmlFor="zip" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">ZIP Code</label>
                                        <input
                                            id="zip"
                                            name="zip"
                                            type="text"
                                            placeholder="10001"
                                            className={`w-full rounded-2xl border ${errors.zip ? 'border-red-300 bg-red-50/50' : 'border-border bg-muted/20'} px-6 py-4 outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-lg font-light`}
                                        />
                                        {errors.zip && <p className="text-xs text-red-500 font-bold tracking-wide pl-2">{errors.zip}</p>}
                                    </div>
                                    <div className="space-y-3">
                                        <label htmlFor="current-rate" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Current Rate</label>
                                        <input
                                            id="current-rate"
                                            name="currentRate"
                                            type="number"
                                            step="0.125"
                                            placeholder="7.25%"
                                            className="w-full rounded-2xl border border-border bg-muted/20 px-6 py-4 outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-lg font-light"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label htmlFor="loan-range" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Loan Balance</label>
                                        <select
                                            id="loan-range"
                                            name="loanRange"
                                            className="w-full rounded-2xl border border-border bg-muted/20 px-6 py-4 outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-lg font-light appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-no-repeat bg-[right_1.5rem_center]"
                                        >
                                            <option value="<100k">&lt; $100k</option>
                                            <option value="100-250k">$100k - $250k</option>
                                            <option value="250-500k">$250k - $500k</option>
                                            <option value="500k+">$500k +</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="home-type" className="text-sm font-bold uppercase tracking-widest text-muted-foreground/80">Home Type</label>
                                        <select
                                            id="home-type"
                                            name="homeType"
                                            className="w-full rounded-2xl border border-border bg-muted/20 px-6 py-4 outline-none transition-all focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-lg font-light appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-no-repeat bg-[right_1.5rem_center]"
                                        >
                                            <option value="single">Single Family</option>
                                            <option value="condo">Condo</option>
                                            <option value="multi">Multi-Family</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        className="mt-1 size-6 rounded-lg border-border text-accent focus:ring-accent transition-all cursor-pointer ring-offset-2"
                                    />
                                    <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-all duration-300">
                                        I agree to receive precise rate alerts and understand this analysis is for informational purposes only.
                                    </span>
                                </label>
                                {errors.agree && <p className="text-xs text-red-500 font-bold tracking-wide pl-2">{errors.agree}</p>}
                                <p className="text-xs text-muted-foreground/50 font-light pl-10">
                                    We only send alerts when it matters. Unsubscribe anytime.
                                </p>
                            </div>

                            {submitError && (
                                <div className="p-5 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                    <div className="size-2 rounded-full bg-red-400" />
                                    {submitError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-[2rem] bg-accent py-6 text-center font-bold text-accent-foreground shadow-2xl shadow-accent/10 transition-all hover:scale-[1.02] hover:shadow-accent/20 active:scale-95 text-xl disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-accent/20 outline-none"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    "Establish My Alert"
                                )}
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
