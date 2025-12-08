import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { Toaster } from "sonner";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SanityLive } from "@/lib/sanity/lib/live";
import { handleError } from "./client-utils";

export const metadata: Metadata = {
  title: "Innovin Labs - Rapidly Transforming Ideas into Digital Solutions",
  description: "We help startups and small businesses build bold, scalable tech fast.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body>
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

