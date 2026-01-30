import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t border-border/10 bg-background py-20">
            <div className="container mx-auto px-6 md:px-10">
                <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
                    <div className="max-w-md text-center md:text-left space-y-4">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <div className="size-6 rounded-lg bg-accent/20 flex items-center justify-center">
                                <div className="size-2 rounded-full bg-accent" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">Clarity</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                            Transparent market intelligence for the discerning homeowner.
                            We believe financial control begins with quiet confidence.
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-bold">
                            © {new Date().getFullYear()} Clarity Intelligence. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
                            <Link href="#" className="transition-all hover:text-accent focus:text-accent outline-none">
                                Privacy
                            </Link>
                            <Link href="#" className="transition-all hover:text-accent focus:text-accent outline-none">
                                Terms
                            </Link>
                            <Link href="#" className="transition-all hover:text-accent focus:text-accent outline-none">
                                Ethics
                            </Link>
                        </div>
                        <p className="text-[10px] text-muted-foreground/30 text-center md:text-right max-w-xs leading-normal font-light">
                            Informational purposes only. Rates and savings depend on individual
                            credit, location, and market volatility.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
