import TechStackPage from "@/components/TechStackPage";
import Schema from "@/components/Schema";

export const metadata = {
    title: "Our Tech Stack | Innovin Labs",
    description: "Explore the powerful tools and modern frameworks we use to build world-class products.",
    alternates: {
        canonical: "/tech-stack",
    },
};

export default function TechStackRoute() {
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
                name: "Tech Stack",
                item: "https://innovinlabs.com/tech-stack"
            }
        ]
    };

    return (
        <>
            <Schema data={jsonLd} />
            <TechStackPage />
        </>
    );
}
