import type { Metadata } from "next";
import AboutUs from "@/components/AboutUs";

export const metadata: Metadata = {
  title: "About Us | Innovin Labs - Our Journey, Vision & Leadership Team",
  description: "Learn about Innovin Labs' journey from building social health solutions to helping startups succeed. Meet our leadership team and discover our core values.",
};

export default function AboutPage() {
  return <AboutUs />;
}

