import type { Metadata } from "next";
import { spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Zoeta AI — Agentic Automation Studio | AI Agents, Websites & Workflows",
  description:
    "We build AI-powered systems that deliver measurable ROI. Premium websites, AI agents, custom workflows & AI consultancy by a 2x founder with 5+ years in AI.",
  openGraph: {
    title: "Zoeta AI — Agentic Automation Studio",
    description:
      "We build AI-powered systems that deliver measurable ROI. Premium websites, AI agents, custom workflows & AI consultancy.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-display antialiased bg-surface-base text-white/90 overflow-x-hidden`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <div className="noise-overlay" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
