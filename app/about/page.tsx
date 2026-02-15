import type { Metadata } from "next";
import AboutUs from "@/components/AboutUs";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "About Us | Innovin Labs - Our Journey, Vision & Leadership Team",
  description: "Learn about Innovin Labs' journey from building social health solutions to helping startups succeed. Meet our leadership team and discover our core values.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Innovin Labs - Our Journey, Vision & Leadership Team",
    description: "Learn about Innovin Labs' journey from building social health solutions to helping startups succeed.",
    url: "https://innovinlabs.com/about",
  },
};

export default function AboutPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Innovin Labs - India",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Trivandrum",
        addressCountry: "IN"
      },
      url: "https://innovinlabs.com",
      image: "https://innovinlabs.com/images/tvm-office.jpg"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Innovin Labs - Australia",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressCountry: "AU"
      },
      url: "https://innovinlabs.com",
      image: "https://innovinlabs.com/images/melbourne.png"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Innovin Labs - USA",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US"
      },
      url: "https://innovinlabs.com"
    },
    {
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
          name: "About Us",
          item: "https://innovinlabs.com/about"
        }
      ]
    }
  ];

  return (
    <>
      <Schema data={jsonLd} />
      <AboutUs />
    </>
  );
}

