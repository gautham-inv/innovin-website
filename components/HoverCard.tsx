"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface HoverCardProps {
  // Content props - if children is provided, it takes precedence
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  
  // Link props (if provided, card becomes a link)
  href?: string;
  as?: "div" | "link";
  
  // Styling props
  className?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
  height?: string;
  width?: string;
  backgroundColor?: string;
  shadow?: string;
  
  // Content styling overrides
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  contentClassName?: string;
  
  // Hover effect
  hoverScale?: string;
  enableHover?: boolean;
}

export default function HoverCard({
  title,
  subtitle,
  description,
  icon,
  children,
  href,
  as = href ? "link" : "div",
  className = "",
  borderColor = "border-primary",
  borderWidth = "border",
  borderRadius = "rounded-[16px]",
  padding = "p-6",
  height,
  width,
  backgroundColor = "bg-white",
  shadow = "shadow-[0px_0px_25px_0px_rgba(102,194,226,0.5),0px_2px_4px_0px_rgba(0,0,0,0.25)]",
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  iconClassName = "mb-[13px]",
  contentClassName = "flex flex-col gap-[11px]",
  hoverScale = "hover:scale-105",
  enableHover = true,
}: HoverCardProps) {
  // Build base classes
  const baseClasses = `
    ${backgroundColor}
    ${borderColor}
    ${borderWidth}
    ${borderRadius}
    ${padding}
    ${shadow}
    flex
    flex-col
    transition
    ${enableHover ? hoverScale : ""}
    ${height || ""}
    ${width || ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  // If children is provided, use it directly (allows complete customization)
  if (children) {
    if (as === "link" && href) {
      return (
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      );
    }
    return <div className={baseClasses}>{children}</div>;
  }

  // Default content structure
  const content = (
    <>
      {icon && <div className={iconClassName}>{icon}</div>}
      {title && (
        <h3 className={titleClassName || "text-[28px] md:text-[32px] font-semibold leading-[1.7] text-black font-['Manrope',sans-serif]"}>
          {title}
        </h3>
      )}
      {(subtitle || description) && (
        <div className={`${contentClassName} text-black`}>
          {subtitle && (
            <p className={subtitleClassName || "text-[18px] md:text-[20px] font-medium leading-[29.6px] tracking-[-0.3px] font-['Manrope',sans-serif]"}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={descriptionClassName || "text-[15px] md:text-[16px] font-light leading-[1.5] tracking-[-0.24px] font-['Manrope',sans-serif]"}>
              {description}
            </p>
          )}
        </div>
      )}
    </>
  );

  // Render as Link or div
  if (as === "link" && href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

