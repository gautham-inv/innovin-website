"use client";

import { techStackData } from "@/lib/techStackData";
import { AnimatedButton } from "./AnimatedButton";
import Link from "next/link";
import Footer from "./Footer";
import { useContactModal } from "./ContactModal";

export default function TechStackPage() {
    const { openModal } = useContactModal();

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-6 xl:px-[70px] bg-neutral-50 border-b border-neutral-100">
                <div className="max-w-[1681px] mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl text-[#232323] font-semibold leadingUnderline mb-6 tracking-tight">
                        Our <span className="text-[#005c89]">Tech Stack</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto font-medium">
                        We leverage a world-class technology stack to build robust, scalable, and innovative solutions for our partners.
                    </p>
                </div>
            </section>

            {/* Categorized Tech Stack */}
            <section className="py-20 px-4 sm:px-6 lg:px-6 xl:px-[70px]">
                <div className="max-w-[1681px] mx-auto space-y-24">
                    {techStackData.map((category, idx) => (
                        <div key={idx} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#005c89] whitespace-nowrap">
                                    {category.title}
                                </h2>
                                <div className="h-[1px] w-full bg-neutral-200" />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
                                {category.items.map((item, itemIdx) => (
                                    <a
                                        key={itemIdx}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md hover:border-[#66c2e2]/30 hover:bg-[#66c2e2]/5 transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 flex items-center justify-center p-2 relative">
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&size=200&background=f3f4f6&color=374151`;
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm sm:text-base font-semibold text-neutral-700 group-hover:text-[#005c89] transition-colors text-center">
                                            {item.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-6 xl:px-[70px] bg-[#131518] text-white">
                <div className="max-w-[1681px] mx-auto text-center space-y-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                        Ready to build something amazing with us?
                    </h2>
                    <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">
                        Our experts are ready to help you choose the right technology for your next big project.
                    </p>
                    <div className="pt-4 flex justify-center">
                        <AnimatedButton onClick={openModal} className="bg-[#66c2e2] text-white px-10 py-4 text-lg font-bold rounded-full">
                            Get in Touch
                        </AnimatedButton>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
