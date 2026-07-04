import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Sports Foundry — Where every sport connects.",
  description:
    "A single digital sports ecosystem that brings together athletes, teams, academies, brands, corporates, and the wider sports community. Discover opportunities, build careers, and grow the game.",
  keywords: [
    "sports platform",
    "athletes",
    "teams",
    "academies",
    "brand partnerships",
    "corporate sports",
    "tournaments",
    "sports community",
    "The Sports Foundry",
  ],
  authors: [{ name: "The Sports Foundry" }],
  icons: { icon: "/uploads/client-logo.png" },
  openGraph: {
    title: "The Sports Foundry — Sports Ecosystem Platform",
    description: "Where every sport connects.",
    siteName: "The Sports Foundry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sports Foundry — Sports Ecosystem Platform",
    description: "Where every sport connects.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
