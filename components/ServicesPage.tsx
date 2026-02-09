"use client";

import { useContactModal } from "./ContactModal";
import { AnimatedButton } from "./AnimatedButton";

const imgLogoDark = "/images/logo.png";
const imgEllipse2 = "/images/blue_gradient.svg";
// Using a placeholder image - replace with actual service images
const imgProductDev = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop";
const imgDesign = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop";
const imgConsulting = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop";
const imgAIConsulting = "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=800&fit=crop";

export default function ServicesPage() {
  const { openModal } = useContactModal();

  const services = [
    {
      title: "Smart Product Development",
      description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects. We leverage the power of existing tools and technology to streamline your operations, slash costs, and build a smarter, faster, and future-proof solution for your business needs.",
      bullets: [
        "Boost your coding superpowers with AI-simplify complexity, code naturally, and enhance reliability and speed!",
        "AI handles entry-level coding, allowing developers to focus on complex tasks, integration, and strategic innovation.",
      ],
      image: imgProductDev,
      imageLeft: false,
    },
    {
      title: "AI-Enhanced Design and Prototyping",
      description: "We blend creativity with intelligence to transform ideas into intuitive, data-driven designs. By harnessing AI-powered insights and rapid prototyping tools, we help you visualize, validate, and refine products faster ensuring every design decision is backed by precision, performance, and user delight.",
      bullets: [
        "We develop innovative design options and generate multiple solutions based on AI-driven algorithms and constraints.",
        "We simulate user journeys and anticipate potential bottlenecks using AI-based modeling, informing design iterations and optimization.",
      ],
      image: imgDesign,
      imageLeft: true,
    },
    {
      title: "Strategic Technology Consulting",
      description: "We're not just software consultants – we're your Trusted Tech Innovation Partner and efficiency architects. We leverage the power of existing tools and technology to streamline your operations, slash costs, and build a smarter, faster, and future-proof solution for your business needs.",
      bullets: [
        "Craft Custom Plans: We tailor a technology roadmap that leverages existing tools to automate tasks, improve data flow, and enhance collaboration.",
        "Offer Smart Solutions: We use powerful off-the-shelf tools, like AI-powered data analysis, to fit your specific needs and budget.",
        "Capacity Building:",
      ],
      image: imgConsulting,
      imageLeft: false,
    },
    {
      title: "Strategic AI Consulting",
      description: "We empower you with intelligent solutions, leveraging AI tools to solve specific business problems and achieve strategic goals.",
      bullets: [
        "Tailored intelligence that crafts solutions optimized for your unique industry challenges, for maximum impact.",
        "Combine expert-driven AI tools with deep industry knowledge, ensuring solutions that seamlessly integrate with your existing operations.",
      ],
      image: imgAIConsulting,
      imageLeft: true,
    },
  ];

  return (
    <main id="main-content" className="bg-white flex flex-col items-start px-0 py-5 sm:py-6 lg:py-[20px] relative min-h-screen w-full pt-24 sm:pt-28 lg:pt-32">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 xl:px-[70px] py-5 sm:py-6 lg:py-[20px]">
        <div className="flex flex-col gap-[60px] sm:gap-[100px] xl:gap-[80px] items-start relative w-full max-w-[1681px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center px-4 sm:px-5 lg:px-[20px] py-0 relative w-full">
            <div className="flex items-start pl-0 pr-4 sm:pr-5 lg:pr-[20px] relative w-full">
              <div className="flex flex-col items-center justify-center relative w-full">
                {/* Blur Banner Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[#66c2e2]/15 blur-[60px] rounded-full -z-10 pointer-events-none mix-blend-multiply" />

                <h1 className="text-4xl sm:text-6xl lg:text-7xl text-[#232323] font-semibold leading-tight tracking-tight mb-4 sm:mb-5 lg:mb-6 w-full text-center">
                  Our Services
                </h1>
              </div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-[#5a5a5a] leading-relaxed max-w-[600px] mx-auto w-full text-center">
              We infuse AI into all aspects of technology and development, delivering smarter outcomes and smoother experiences.
            </p>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 xl:gap-24 items-start relative w-full">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col xl:flex-row gap-8 sm:gap-10 xl:gap-16 items-start relative w-full ${service.imageLeft ? "xl:flex-row-reverse" : ""
                  }`}
              >
                {/* Content */}
                <div className="flex-1 flex flex-col gap-4 sm:gap-6 items-start relative text-[#232323] w-full xl:w-auto order-2 xl:order-none">
                  <div className="flex flex-col gap-3 sm:gap-4 items-start relative w-full">
                    <h2 className="font-semibold leading-[1.2] sm:leading-[1.3] relative text-3xl sm:text-4xl lg:text-5xl w-full tracking-tight">
                      {service.title}
                    </h2>
                    <p className="font-normal leading-relaxed relative text-base sm:text-lg text-gray-700 w-full mt-2">
                      {service.description}
                    </p>
                  </div>
                  <ul className="block font-normal leading-relaxed relative text-base sm:text-lg text-gray-700 w-full space-y-2 mt-2">
                    {service.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="ms-6 list-disc pl-2">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className="h-[250px] sm:h-[300px] md:h-[350px] xl:h-[400px] relative shrink-0 w-full sm:w-full md:w-[500px] xl:w-[550px] rounded-2xl overflow-hidden order-1 xl:order-none shadow-lg">
                  <img
                    alt={service.title}
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                    src={service.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

