import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/60 backdrop-blur-xl transition-all duration-500">
            <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-10">
                <Link
                    href="/"
                    className="flex items-center gap-3 group outline-none"
                >
                    <div className="size-9 rounded-xl bg-accent shadow-lg shadow-accent/20 group-hover:rotate-12 transition-transform duration-500" />
                    <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">Clarity</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        href="/signup"
                        className="hidden sm:inline-block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none focus:ring-2 focus:ring-accent/20 rounded-lg px-2"
                    >
                        Insights
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-full bg-accent px-7 py-2.5 text-sm font-bold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/20 active:scale-95 focus:ring-4 focus:ring-accent/10 outline-none"
                    >
                        Get rate alerts
                    </Link>
                </div>
            </div>
        </nav>
    );
}
