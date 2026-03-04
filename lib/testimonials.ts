const zirklyLogo = "/images/zirkly.png";
const innovinLogo = "/images/logo.png";
const humanxLogo = "/images/humanx.png";
const goodlifeLogo = "/images/goodlife.png";
const safelifeLogo = "/images/safelife.png";
const retalystLogo = "/images/retalyst.png";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  logo: string;
  link: string;
  video?: string;
  description?: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Innovin Labs has been a committed and expert partner in delivering Zirkly. They managed the end-to-end delivery seamlessly, resulting in a significantly shorter time to launch our app. Their professionalism and technical expertise made the entire process smooth and efficient.",
    author: "Sujith Chellappan",
    role: "Founder",
    company: "Zirkly",
    logo: zirklyLogo,
    link: "https://www.zirkly.com/",
    video:
      "https://res.cloudinary.com/dejb29i0k/video/upload/v1770884539/zirkly_finalll_nv8r49.webm",
    description:
      "Zirkly is a fast, safe local marketplace that lets you buy and sell nearby with real people in just a few taps.",
  },
  {
    quote:
      "Innovin Labs enabled Retalyst to go from ideation to MVP in just a few weeks. They quickly understood our requirements and delivered exactly what we needed. Highly recommended for their speed, expertise, and reliability.",
    author: "Sujith Chellappan",
    role: "Founder",
    company: "Retalyst",
    logo: retalystLogo,
    link: "https://www.retalyst.com/",
    description:
      "Retalyst is an AI-powered platform that instantly generates professional, SEO-optimized product titles, descriptions, specs, and tags to help businesses create compelling product content faster.",
  },
  
  {
    quote:
      "As an entrepreneur, I needed my website delivered efficiently. Innovin Labs not only met deadlines with high quality but also shared our company values. The team was responsive, communicative, and professional. I highly recommend them.",
    author: "Ramon Portilla",
    role: "Founder",
    company: "HumanX Insights",
    logo: humanxLogo,
    link: "https://humanxinsights.com/",
    description:
      "HumanX Insights is a consulting firm that helps purpose-driven organizations design and implement human experience strategies to accelerate customer and employee loyalty.",
    image:
      "https://res.cloudinary.com/dejb29i0k/image/upload/v1770912993/Screenshot_2026-02-12_at_9.19.27_PM_xiqoqa.png",
  },
  {
    quote:
      "Innovin delivers results. Within 60 days, they delivered a prototype to spec. In 90 days, we launched a unique product to beta testers. Innovin's speed and efficiency are unmatched, setting us on the path toward my dream. Love this team!",
    author: "Mike Ebener",
    role: "Founder, CEO",
    company: "AskSafely",
    logo: safelifeLogo,
    link: "https://www.asksafely.ai/",
    description:
      "AskSafely is a privacy-first AI chat platform that lets you ask anything and automatically deletes your conversations after 8 hours, ensuring answers without storing, selling, or using your data.",
    video:
      "https://res.cloudinary.com/dejb29i0k/video/upload/v1770900888/safelife_final_jcobtq.webm",
  },
];
