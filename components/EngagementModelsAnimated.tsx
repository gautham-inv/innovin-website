"use client";

import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { Users, Target, Cpu, Repeat, LucideIcon } from "lucide-react";

interface EngagementModel {
    title: string;
    description: string;
    Icon: LucideIcon;
}

const engagementModels: EngagementModel[] = [
    {
        title: "Tap India's Tech Talent Pool",
        description: "Enabling access to India's exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.",
        Icon: Users,
    },
    {
        title: "Project-Based Execution",
        description: "From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.",
        Icon: Target,
    },
    {
        title: "Remote CTO & Technology Team",
        description: "Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.",
        Icon: Cpu,
    },
    {
        title: "Build, Operate, Transfer",
        description: "We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.",
        Icon: Repeat,
    },
];

export default function EngagementModelsAnimated() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Check if desktop
    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1280);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // GSAP Animation for Desktop
    useLayoutEffect(() => {
        if (!isDesktop || typeof window === "undefined") return;

        let cleanupFn: (() => void) | null = null;

        const initAnimation = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const section = sectionRef.current;
            if (!section) return;

            // Get pairs of elements (line → card → content)
            const pairs = [
                {
                    line: section.querySelector<SVGPathElement>(".line-path-0"),
                    card: section.querySelector<HTMLDivElement>(".animated-card-0"),
                    content: section.querySelector<HTMLDivElement>(".card-content-0"),
                },
                {
                    line: section.querySelector<SVGPathElement>(".line-path-1"),
                    card: section.querySelector<HTMLDivElement>(".animated-card-1"),
                    content: section.querySelector<HTMLDivElement>(".card-content-1"),
                },
                {
                    line: section.querySelector<SVGPathElement>(".line-path-2"),
                    card: section.querySelector<HTMLDivElement>(".animated-card-2"),
                    content: section.querySelector<HTMLDivElement>(".card-content-2"),
                },
                {
                    line: section.querySelector<SVGPathElement>(".line-path-3"),
                    card: section.querySelector<HTMLDivElement>(".animated-card-3"),
                    content: section.querySelector<HTMLDivElement>(".card-content-3"),
                },
            ];

            // Set initial states for all elements
            pairs.forEach(({ line, card, content }) => {
                if (line) {
                    const length = line.getTotalLength();
                    gsap.set(line, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                    });
                }
                if (card) {
                    gsap.set(card, {
                        borderColor: "transparent",
                        boxShadow: "none",
                    });
                }
                if (content) {
                    gsap.set(content, { opacity: 0 });
                }
            });

            // Create the main timeline with ScrollTrigger
            const ctx = gsap.context(() => {
                const masterTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 65%",
                        toggleActions: "play none none none",
                    },
                });

                // For each pair, create a sequence: line → card border → content
                // All pairs start together but are staggered by 0.15s
                pairs.forEach(({ line, card, content }, index) => {
                    const startTime = index * 0.15; // Stagger start times

                    // Line draws
                    if (line) {
                        masterTl.to(
                            line,
                            {
                                strokeDashoffset: 0,
                                duration: 0.5,
                                ease: "power2.out",
                            },
                            startTime
                        );
                    }

                    // Card border appears right after line finishes
                    if (card) {
                        masterTl.to(
                            card,
                            {
                                borderColor: "#66c2e2",
                                boxShadow: "0px 0px 10px 0px rgba(102,194,226,0.5)",
                                duration: 0.3,
                                ease: "power2.out",
                            },
                            startTime + 0.45 // Start just before line finishes
                        );
                    }

                    // Content fades in after border appears
                    if (content) {
                        masterTl.to(
                            content,
                            {
                                opacity: 1,
                                duration: 0.3,
                                ease: "power2.out",
                            },
                            startTime + 0.65 // Start after border animation begins
                        );
                    }
                });
            }, section);

            cleanupFn = () => {
                ctx.revert();
            };
        };

        initAnimation();

        return () => {
            if (cleanupFn) cleanupFn();
        };
    }, [isDesktop]);

    if (!isDesktop) {
        // Mobile: Simple stacked cards
        return (
            <div className="xl:hidden relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-[#66c2e2] -translate-x-1/2 z-0" />
                <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                    {engagementModels.map((model, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#66c2e2] rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 text-center shadow-[0px_0px_10px_0px_rgba(102,194,226,0.5)]"
                        >
                            <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] mb-4 sm:mb-5 flex items-center justify-center bg-[#f0f9ff] rounded-2xl mx-auto">
                                <model.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#005c89]" />
                            </div>
                            <h3 className="text-[22px] sm:text-[26px] md:text-[28px] text-black font-medium leading-[1.3] sm:leading-[1.4] mb-3 sm:mb-4">
                                {model.title}
                            </h3>
                            <p className="text-[16px] sm:text-[18px] text-black leading-[1.6] sm:leading-[1.65]">
                                {model.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Desktop: Animated diagram
    return (
        <div ref={sectionRef} className="hidden xl:block relative h-[550px] w-full">
            {/* Center Box - Always visible - Moved up */}
            <div className="absolute left-1/2 top-[280px] -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black rounded-[20px] p-[40px] z-10">
                <p className="text-[36px] text-[#005c89] font-semibold leading-[1.4] whitespace-nowrap">
                    Our engagement models
                </p>
            </div>

            {/* SVG Lines - L-shaped connections from center box to cards */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
                viewBox="0 0 1680 550"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
            >
                {/* Line 0: Center to Top Left card - starts from left-top of center box, goes up then left to card */}
                <path
                    className="line-path-0"
                    d="M 620 235 L 620 140 Q 620 130 610 130 L 480 130"
                    stroke="#66c2e2"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Line 1: Center to Top Right card - starts from right-top of center box, goes up then right to card */}
                <path
                    className="line-path-1"
                    d="M 1060 235 L 1060 140 Q 1060 130 1070 130 L 1200 130"
                    stroke="#66c2e2"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Line 2: Center to Bottom Left card - starts from left-bottom of center box, goes down then left to card */}
                <path
                    className="line-path-2"
                    d="M 620 325 L 620 410 Q 620 420 610 420 L 520 420"
                    stroke="#66c2e2"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Line 3: Center to Bottom Right card - starts from right-bottom of center box, goes down then right to card */}
                <path
                    className="line-path-3"
                    d="M 1060 325 L 1060 395 Q 1060 405 1070 405 L 1200 405"
                    stroke="#66c2e2"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Card 0: Top Left - Horizontal layout */}
            <div className="animated-card-0 absolute left-0 top-[20px] w-[480px] bg-white border border-transparent rounded-[16px] p-[20px] z-20">
                <div className="card-content-0 flex items-start gap-5">
                    <div className="w-[70px] h-[70px] shrink-0 flex items-center justify-center bg-[#f0f9ff] rounded-xl">
                        <Users className="w-9 h-9 text-[#005c89]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[24px] text-[#232323] font-semibold leading-[1.3] mb-2">
                            Tap India&apos;s Tech Talent Pool
                        </h3>
                        <p className="text-[16px] text-[#4a5568] leading-[1.7]">
                            Enabling access to India&apos;s exceptional talent by tapping into a diverse pool of skilled professionals to drive project success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 1: Top Right - Horizontal layout */}
            <div className="animated-card-1 absolute right-0 top-[20px] w-[480px] bg-white border border-transparent rounded-[16px] p-[20px] z-20">
                <div className="card-content-1 flex items-start gap-5">
                    <div className="w-[70px] h-[70px] shrink-0 flex items-center justify-center bg-[#f0f9ff] rounded-xl">
                        <Target className="w-9 h-9 text-[#005c89]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[24px] text-[#232323] font-semibold leading-[1.3] mb-2">
                            Project-Based Execution
                        </h3>
                        <p className="text-[16px] text-[#4a5568] leading-[1.7]">
                            From defining tasks and timelines to building and delivering the final product, we ensure smooth execution and set the stage for ongoing improvement.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 2: Bottom Left - Horizontal layout - Moved up */}
            <div className="animated-card-2 absolute left-0 top-[360px] w-[520px] bg-white border border-transparent rounded-[16px] p-[20px] z-20">
                <div className="card-content-2 flex items-start gap-5">
                    <div className="w-[70px] h-[70px] shrink-0 flex items-center justify-center bg-[#f0f9ff] rounded-xl">
                        <Cpu className="w-9 h-9 text-[#005c89]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[24px] text-[#232323] font-semibold leading-[1.3] mb-2">
                            Remote CTO & Technology Team
                        </h3>
                        <p className="text-[16px] text-[#4a5568] leading-[1.7]">
                            Enhance your business with our CTO and expert tech team, seamlessly filling skill gaps and offering flexible, scalable, and cost-effective solutions without the overhead of in-house hiring.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 3: Bottom Right - Horizontal layout - Moved up */}
            <div className="animated-card-3 absolute right-0 top-[340px] w-[480px] bg-white border border-transparent rounded-[16px] p-[20px] z-20">
                <div className="card-content-3 flex items-start gap-5">
                    <div className="w-[70px] h-[70px] shrink-0 flex items-center justify-center bg-[#f0f9ff] rounded-xl">
                        <Repeat className="w-9 h-9 text-[#005c89]" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[24px] text-[#232323] font-semibold leading-[1.3] mb-2">
                            Build, Operate, Transfer
                        </h3>
                        <p className="text-[16px] text-[#4a5568] leading-[1.7]">
                            We build the team, operate it for a set period, and then transfer full ownership to the client, ensuring a smooth transition.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
