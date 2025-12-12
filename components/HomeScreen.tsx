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

export default function HomeScreen() {
  return (
    <div className="bg-white relative w-full overflow-x-hidden">
      <main className="w-full">
        <Hero />
        <WhyUs />
        <Services />
        <TechStack />
        <Testimonials />
        <Careers />
        <Offices />
      </main>
    </div>
  );
}

