import type { Metadata } from "next";
import WhyUsPage from "@/components/WhyUsPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why Choose Us | Innovin Labs - Your Trusted Tech Innovation Partner",
  description: "Discover why Innovin Labs is the ideal partner for your tech journey. Learn about our expertise, flexible engagement models, and commitment to delivering excellence.",
};
export default function WhyUs() {
  return (
    <>
      <WhyUsPage />
      <Footer />
    </>
  );
}
