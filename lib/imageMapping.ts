/**
 * Image Mapping File
 * Maps hash-based filenames to descriptive names for better code readability
 * 
 * Note: Figma Desktop MCP tool generates hash-based filenames.
 * This file provides a mapping layer for easier maintenance.
 */

// PNG Images
export const images = {
  // Logos
  innovinLabsLogo: "/images/0e1e238a26444c8cba519ce5114ec632284ffba6.png", // TODO: This is currently Zirkley logo - needs to be replaced
  zirkleyLogo: "/images/0e1e238a26444c8cba519ce5114ec632284ffba6.png",

  // Hero Section
  heroEllipse: "/images/4c3dce0794efde83822631e43c726b0634816851.png",

  // Services Section
  serviceImage1: "/images/14f42026da7cb504578d95bd4fe568ba9d508990.png",
  serviceImage2: "/images/40688c96c85b7fc360b2720ac8410be60bf7b82d.png",
  serviceImage3: "/images/f7e1504dcfcf4d9d9e376a8efb89089a46d51dbe.png",
  vectorIcon: "/images/9454b043f49c13ff58150de23ad3177131cba25a.png",

  // Offices Section
  officeImage1: "/images/198d18e8c0d56e97f39ca761d1da9e5d1d6e3db6.png",
  officeImage2: "/images/0f449b448809a2d5041d4342d86da17c4162fee0.png",
  officeImage3: "/images/708c364634fd47fda51f34d943e7a4fcf01b26fd.png",

  // Testimonials
  testimonialAvatar1: "/images/9454b043f49c13ff58150de23ad3177131cba25a.png",
  testimonialAvatar2: "/images/b96a25f5c5aaa1da26f63e8a421b0a4c393b75f5.png",
} as const;

// Tech Stack SVG Logos
// These are the 39 SVG files downloaded - mapping needs to be verified against Figma design
export const techStackLogos = {
  // Common tech stack logos (order may need adjustment based on Figma design)
  html5: "/images/techstack/d1f3457c582c326cacd5999f9462244cd0b086a6.svg",
  javascript: "/images/techstack/d1fe1a927e11f7d2b0833f603607ab2e0464cb5b.svg",
  googleCloud: "/images/techstack/d6bfd701a788246b82a09a8007bc04b677cc62ba.svg",
  // Add more mappings as needed - there are 39 SVG files total
} as const;

