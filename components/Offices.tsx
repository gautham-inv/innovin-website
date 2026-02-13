"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";

type Office = {
  id: string;
  name: string;
  location: string;
  company: string;
  cin: string;
  address: string;
  image: string;
  mapUrl: string;
};

const offices: Office[] = [
  {
    id: "trivandrum",
    name: "Trivandrum",
    location: "Trivandrum, India",
    company: "InnoAI Technologies Pvt. Ltd.",
    cin: "U72900KL2023PTC078123",
    address: "VRA A 39, TC 91/828, Anayara (PO), Thiruvananthapuram- 695029, Kerala",
    image:
      "/images/tvm-office.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=C%26T+Engineers+8.5095267,76.9087915",
  },
  {
    id: "melbourne",
    name: "Melbourne",
    location: "Melbourne, Australia",
    company: "Innovin Labs Australia",
    cin: "ACN 123 456 789",
    address: "123 Innovation Street, Melbourne, VIC 3000",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Melbourne+VIC+3000",
  },
  {
    id: "california",
    name: "California",
    location: "San Francisco, CA, USA",
    company: "Innovin Labs Inc.",
    cin: "EIN 12-3456789",
    address: "456 Tech Avenue, San Francisco, CA 94105",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=San+Francisco+CA+94105",
  },
];

export default function OfficeLocations() {
  const [hoveredId, setHoveredId] = useState<string>("trivandrum");
  const [mobileExpanded, setMobileExpanded] =
    useState<string>("trivandrum");

  const openMap = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-6 xl:px-[70px]">
      <div className="w-full max-w-[1681px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-slate-800">
          Our offices
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:flex gap-4 h-[600px]">
          {offices.map((office) => {
            const isExpanded = hoveredId === office.id;

            return (
              <div
                key={office.id}
                onMouseEnter={() => setHoveredId(office.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${isExpanded ? "flex-[2]" : "flex-[0.5]"
                  }`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${office.image})`,
                    transform: isExpanded ? "scale(1.05)" : "scale(1)",
                  }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${isExpanded ? "opacity-30" : "opacity-60"
                    }`}
                />

                {/* Text readability gradient */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-700 ${isExpanded ? "opacity-100" : "opacity-80"
                    }`}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div
                    className={`transition-all duration-700 ${isExpanded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {office.location}
                    </h3>
                    <p className="text-slate-200 text-sm mb-1">
                      {office.company}
                    </p>
                    <p className="text-slate-300 text-xs mb-1">
                      CIN: {office.cin}
                    </p>
                    <p className="text-slate-300 text-xs mb-4">
                      {office.address}
                    </p>

                    <button
                      onClick={() => openMap(office.mapUrl)}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors"
                    >
                      <MapPin size={16} />
                      <span className="text-sm">View on Map</span>
                    </button>
                  </div>

                  {/* Collapsed label */}
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${isExpanded
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                      }`}
                  >
                    <p className="text-white text-2xl font-bold -rotate-90">
                      {office.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4">
          {offices.map((office) => {
            const isExpanded = mobileExpanded === office.id;

            return (
              <div
                key={office.id}
                onClick={() => setMobileExpanded(office.id)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${isExpanded ? "h-[400px]" : "h-[100px]"
                  }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${office.image})` }}
                />

                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${isExpanded ? "opacity-30" : "opacity-60"
                    }`}
                />

                {/* Text readability gradient */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ${isExpanded ? "opacity-100" : "opacity-80"
                    }`}
                />

                <div className="relative h-full flex flex-col justify-end p-6">
                  {isExpanded ? (
                    <>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {office.location}
                      </h3>
                      <p className="text-slate-200 text-sm mb-1">
                        {office.company}
                      </p>
                      <p className="text-slate-300 text-xs mb-1">
                        CIN: {office.cin}
                      </p>
                      <p className="text-slate-300 text-xs mb-4">
                        {office.address}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMap(office.mapUrl);
                        }}
                        className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white"
                      >
                        <MapPin size={16} />
                        <span className="text-sm">View on Map</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xl font-bold">
                        {office.name}
                      </p>
                      <MapPin size={20} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
