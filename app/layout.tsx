import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Toaster } from "sonner";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SanityLive } from "@/lib/sanity/lib/live";
import { handleError } from "./client-utils";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "optional", // Changed from "swap" to prevent FOUT and layout shifts
  variable: "--font-manrope",
  preload: true, // Preload font for faster rendering
  adjustFontFallback: true, // Automatically adjust fallback font metrics
});

// Add metadata to ensure consistent rendering
export const metadata: Metadata = {
  title: "Innovin Labs - Rapidly Transforming Ideas into Digital Solutions",
  description: "We help startups and small businesses build bold, scalable tech fast.",
};

// Viewport configuration for Next.js 15 (must be exported separately)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        {/* Toast notifications for Sanity Live errors */}
        <Toaster />
        {/* SanityLive enables live updates - only activates on CMS pages via client-side logic */}
        <SanityLive onError={handleError} />
        {/* VisualEditing shows edit overlays - only render in draft mode */}
        {isDraftMode && (
          <VisualEditing />
        )}
        <Navigation />
        {children}
      </body>
    </html>
  );
}

