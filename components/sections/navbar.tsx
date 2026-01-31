"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container-custom h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="size-8 bg-brand-accent rounded-lg flex items-center justify-center">
                        <Bell className="size-4 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-brand-text">Clarity</span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <Link href="/" className="text-[15px] font-medium text-brand-text hover:text-brand-accent transition-colors">How it works</Link>
                    <Link href="/" className="text-[15px] font-medium text-brand-text hover:text-brand-accent transition-colors">Trust</Link>
                    <Link href="/" className="text-[15px] font-medium text-brand-text hover:text-brand-accent transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/signin" className="hidden sm:block text-[15px] font-medium text-brand-muted hover:text-brand-text transition-colors">
                        Log in
                    </Link>
                    <Link href="/signup" className="btn-primary px-5 py-2">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
