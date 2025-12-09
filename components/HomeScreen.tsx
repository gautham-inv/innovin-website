"use client";

import Navigation from "./Navigation";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Services from "./Services";
import TechStack from "./TechStack";
import Testimonials from "./Testimonials";
import Careers from "./Careers";
import Offices from "./Offices";
import Footer from "./Footer";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function HomeScreen() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="bg-white relative w-full overflow-x-hidden">
      <main className="w-full">
        <Hero />
        <div data-lenis-prevent>X
          <WhyUs />
          <Services />
        </div>
        <TechStack />
        <Testimonials />
        <Careers />
        <Offices />
        <Footer />
      </main>
    </div>
  );
}

