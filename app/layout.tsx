import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Manrope } from "next/font/google";
import { ContactModalProvider } from "@/components/ContactModal";
import ScrollToTop from "@/components/ScrollToTop";
import SessionTracker from "@/components/SessionTracker";
import { GoogleAnalytics } from '@next/third-parties/google'

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
  icons: {
    icon: "/images/favicon.png",
  },
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
  // IMPORTANT FOR PERFORMANCE:
  // Calling `draftMode()` (or `cookies()` / `headers()`) in the root layout makes the whole app dynamic,
  // which can significantly slow down a hosted site by disabling static optimization.
  //
  // We only load Sanity Live + Visual Editing in non-production builds by default.
  // To explicitly enable them in production, set:
  //   NEXT_PUBLIC_ENABLE_SANITY_PREVIEW=true
  const enableSanityPreviewTools =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ENABLE_SANITY_PREVIEW === "true";

  const SanityPreviewTools = enableSanityPreviewTools
    ? (await import("./sanity-preview-tools")).default
    : null;

  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        {SanityPreviewTools ? <SanityPreviewTools /> : null}
        <ContactModalProvider>
          <ScrollToTop />
          <SessionTracker />
          <Navigation />
          {children}
        </ContactModalProvider>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}

