import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Manrope } from "next/font/google";
import { ContactModalProvider } from "@/components/ContactModal";
import ScrollToTop from "@/components/ScrollToTop";
import SessionTracker from "@/components/SessionTracker";
import { GoogleAnalytics } from '@next/third-parties/google'
import Schema from "@/components/Schema";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://innovinlabs.com"),
  title: {
    default: "Innovin Labs - Rapidly Transforming Ideas into Digital Solutions",
    template: "%s | Innovin Labs"
  },
  description: "We help startups and small businesses build bold, scalable tech fast.",
  keywords: ["Software Development", "AI Consulting", "Web Development", "Mobile App Development", "Startup Tech Partner"],
  authors: [{ name: "Innovin Labs" }],
  creator: "Innovin Labs",
  publisher: "Innovin Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon.png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innovinlabs.com",
    title: "Innovin Labs - Rapidly Transforming Ideas into Digital Solutions",
    description: "We help startups and small businesses build bold, scalable tech fast.",
    siteName: "Innovin Labs",
    images: [
      {
        url: "/images/og-image.png", // Ensure this image exists in public/images
        width: 1200,
        height: 630,
        alt: "Innovin Labs - Transforming Ideas into Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovin Labs - Rapidly Transforming Ideas into Digital Solutions",
    description: "We help startups and small businesses build bold, scalable tech fast.",
    images: ["/images/og-image.png"], // Fallback to OG image
    creator: "@innovinlabs", // Update with actual handle if strictly known, otherwise okay to omit or generic
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Innovin Labs",
      url: "https://innovinlabs.com",
      logo: "https://innovinlabs.com/images/logo.png",
      sameAs: [
        "https://linkedin.com/company/innovinlabs",
        "https://twitter.com/innovinlabs",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "", // Add if available
        contactType: "customer service",
        email: "info@innovinlabs.com",
        areaServed: "Global",
        availableLanguage: ["English"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Innovin Labs",
      url: "https://innovinlabs.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://innovinlabs.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        <Schema data={jsonLd} />
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

