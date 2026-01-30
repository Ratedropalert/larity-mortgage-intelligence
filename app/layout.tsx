import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PremiumApp | Calm & Modern Solutions",
    template: "%s | PremiumApp",
  },
  description: "Experience the next generation of storytelling and financial alerts with our premium, calm, and modern interface.",
  openGraph: {
    title: "PremiumApp",
    description: "Premium, calm, and modern interface.",
    url: "https://premium-app.example.com",
    siteName: "PremiumApp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PremiumApp",
    description: "Premium, calm, and modern interface.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
