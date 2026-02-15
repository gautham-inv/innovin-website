import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";

export const metadata: Metadata = {
  title: "Our Services | Innovin Labs - Smart Product Development & AI Solutions",
  description: "Explore our AI-enhanced services including smart product development, design and prototyping, strategic technology consulting, and AI solutions for your business.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Innovin Labs - Smart Product Development & AI Solutions",
    description: "Explore our AI-enhanced services including smart product development, design and prototyping, and AI solutions.",
    url: "https://innovinlabs.com/services",
  },
};
export default function ServicesRoute() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Software Development & AI Consulting",
      provider: {
        "@type": "Organization",
        name: "Innovin Labs",
        url: "https://innovinlabs.com"
      },
      areaServed: "Global",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Innovin Labs Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Smart Product Development",
              description: "End-to-end product development from ideation to launch."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI-Enhanced Design and Prototyping",
              description: "Rapid prototyping and user-centric design powered by AI."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Strategic Technology Consulting",
              description: "Expert guidance on technology stack, architecture, and scalability."
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Strategic AI Consulting",
              description: "Leveraging AI to optimize business processes and innovation."
            }
          }
        ]
      }
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
          name: "Services",
          item: "https://innovinlabs.com/services"
        }
      ]
    }
  ];

  return (
    <>
      <Schema data={jsonLd} />
      <ServicesPage />
      <Footer />
    </>
  );
}

