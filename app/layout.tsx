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
  display: "swap", // or "optional" for better performance
  variable: "--font-manrope",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        {/* Toast notifications for Sanity Live errors */}
        <Toaster />
        {/* SanityLive enables live updates - should always be rendered */}
        {/* It only activates stega encoding when draft mode is enabled */}
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

