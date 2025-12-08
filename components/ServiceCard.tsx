"use client";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export default function ServiceCard({ title, subtitle, description, className }: ServiceCardProps) {
  return (
    <div className={`bg-white border border-primary rounded-[16px] p-6 shadow-[0px_0px_25px_0px_rgba(102,194,226,0.5),0px_2px_4px_0px_rgba(0,0,0,0.25)] flex flex-col gap-[13px] h-full transition-transform hover:scale-105 ${className}`}>
      <h3 className="text-[28px] md:text-[32px] font-semibold leading-[1.7] text-black font-['Manrope',sans-serif]">
        {title}
      </h3>
      <div className="flex flex-col gap-[11px] text-black">
        <p className="text-[18px] md:text-[20px] font-medium leading-[29.6px] tracking-[-0.3px] font-['Manrope',sans-serif]">
          {subtitle}
        </p>
        <p className="text-[15px] md:text-[16px] font-light leading-[1.5] tracking-[-0.24px] font-['Manrope',sans-serif]">
          {description}
        </p>
      </div>
    </div>
  );
}

