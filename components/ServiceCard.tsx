"use client";

import HoverCard from "./HoverCard";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export default function ServiceCard({ title, subtitle, description, className }: ServiceCardProps) {
  return (
    <HoverCard
      title={title}
      subtitle={subtitle}
      description={description}
      className={`gap-[13px] h-full ${className || ""}`}
    />
  );
}

