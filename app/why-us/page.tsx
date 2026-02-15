import type { Metadata } from "next";
import WhyUsPage from "@/components/WhyUsPage";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Why Choose Us | Innovin Labs - Your Trusted Tech Innovation Partner",
  description: "Discover why Innovin Labs is the ideal partner for your tech journey. Learn about our expertise, flexible engagement models, and commitment to delivering excellence.",
  alternates: {
    canonical: "/why-us",
  },
  openGraph: {
    title: "Why Choose Us | Innovin Labs - Your Trusted Tech Innovation Partner",
    description: "Discover why Innovin Labs is the ideal partner for your tech journey.",
    url: "https://innovinlabs.com/why-us",
  },
};
export default function WhyUs() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://innovinlabs.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Why Us",
        item: "https://innovinlabs.com/why-us"
      }
    ]
  };

  return (
    <>
      <Schema data={jsonLd} />
      <WhyUsPage />
      <Footer />
    </>
  );
}
