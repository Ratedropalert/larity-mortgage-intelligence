"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { Bell, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SigninPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) throw signInError;

            router.push("/");
        } catch (err: any) {
            setError(err.message || "Invalid credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-bg px-6 py-32 relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <FadeIn direction="up" className="w-full max-w-[440px] relative z-10">
                <div className="card shadow-2xl shadow-gray-200/40 p-10 md:p-12 space-y-12 border-0">
                    <div className="text-center space-y-8">
                        <Link href="/" className="inline-flex items-center gap-2 group">
                            <div className="size-8 bg-brand-accent rounded-lg flex items-center justify-center">
                                <Bell className="size-4 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-brand-text">Clarity</span>
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">Welcome back.</h1>
                            <p className="text-[14px] text-brand-muted font-medium uppercase tracking-widest">Secure Terminal Access</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label>Terminal ID (Email)</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-all ${email ? 'opacity-0' : 'opacity-100 text-brand-muted group-focus-within:text-brand-accent'}`} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@email.com"
                                    className="pl-12"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-end mb-1">
                                <label className="mb-0">Access Key</label>
                                <Link href="#" className="text-[12px] font-bold text-brand-accent hover:underline">Forgot key?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-all ${password ? 'opacity-0' : 'opacity-100 text-brand-muted group-focus-within:text-brand-accent'}`} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="pl-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary py-4 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Authenticating..." : "Authorize Terminal"}
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="pt-10 border-t border-gray-50 text-center">
                        <p className="text-[14px] text-brand-muted">
                            New to the protocol?{" "}
                            <Link href="/signup" className="text-brand-accent font-bold hover:underline">
                                Establish Surveillance
                            </Link>
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}
