import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-navbar': 'calc(100vh - 85px)',
      },
      colors: {
        primary: "#66C2E2",
        secondary: "#005C89",
      },
    },
  },
  plugins: [],
};
export default config;

