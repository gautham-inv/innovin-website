"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { AnimatedButton } from "@/components/AnimatedButton";

const imgLogoDark = "/images/logo.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* 404 Number */}
          <h1 className="text-[120px] sm:text-[180px] lg:text-[240px] font-bold text-primary leading-none mb-4 sm:mb-6 lg:mb-8 tracking-tight">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-2xl px-4">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full sm:w-auto">
            <AnimatedButton 
              onClick={() => router.push("/")} 
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg"
            >
              Go to Homepage
            </AnimatedButton>
            
            
          </div>

          {/* Additional Links */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Knowledge Hub
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/careers"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Careers
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/why-us"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Why Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}

