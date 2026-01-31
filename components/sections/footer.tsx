"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-100 pb-16 pt-32">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 mb-32">
                    {/* Column 1: Brand (Takes up 3 columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="size-8 bg-brand-accent rounded-lg flex items-center justify-center">
                                <Bell className="size-4 text-white" />
                            </div>
                            <span className="text-xl font-bold text-brand-text">Clarity</span>
                        </Link>
                    </div>

                    {/* Column 2: Contact (Takes up 3 columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-[16px] font-bold text-brand-text">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex flex-col space-y-1.5">
                                <span className="text-[14px] text-brand-text font-semibold">Support</span>
                                <span className="text-[15px] text-brand-muted">(888) 288-1980</span>
                            </li>
                            <li className="flex flex-col space-y-1.5">
                                <span className="text-[14px] text-brand-text font-semibold">Sales</span>
                                <span className="text-[15px] text-brand-muted">(888) 288-1980</span>
                            </li>
                            <li className="flex flex-col space-y-1.5">
                                <span className="text-[14px] text-brand-text font-semibold">Email</span>
                                <span className="text-[15px] text-brand-muted">sales@clarity.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Product (Takes up 3 columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-[16px] font-bold text-brand-text">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Rate Surveillance</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Yield Analysis</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Refinance Calculator</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">API Access</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Company (Takes up 3 columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-[16px] font-bold text-brand-text">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">About Us</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Methodology</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Security</Link></li>
                            <li><Link href="#" className="text-[15px] text-brand-muted hover:text-brand-accent transition-colors block py-0.5">Careers</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Centered (Matches reference) */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-6 border-t border-gray-100 pt-10">
                    <p className="text-[14px] text-brand-muted text-left">
                        Copyright © 2026 Clarity Intelligence. All rights reserved.
                    </p>
                    <div className="flex gap-8 md:ml-auto">
                        <Link href="#" className="text-[14px] font-medium text-brand-muted hover:text-brand-text transition-colors">Terms of Use</Link>
                        <Link href="#" className="text-[14px] font-medium text-brand-muted hover:text-brand-text transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
