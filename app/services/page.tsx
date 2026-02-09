import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Services | Innovin Labs - Smart Product Development & AI Solutions",
  description: "Explore our AI-enhanced services including smart product development, design and prototyping, strategic technology consulting, and AI solutions for your business.",
};
export default function ServicesRoute() {
  return (
    <>
      <ServicesPage />
      <Footer />
    </>
  );
}

