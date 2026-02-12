
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
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
        sans: ['var(--font-manrope)', 'sans-serif'], // Make it default
      },
      fontSize: {
        // Ensure consistent font sizes
        base: ['1rem', { lineHeight: '1.5' }],
      },
      screens: {
        'xxl': '1430px',
      },
    },
  },
  plugins: [],
};
export default config;

