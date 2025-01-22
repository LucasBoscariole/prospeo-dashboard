import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-border": "#E6E6E6",
        dark: "#161616",
        grey: {
          600: "#8C8C8C",
          700: "#6F6F6F",
          800: "#515151",
        },
        red: {
          default: "#FF1A26",
          light: {
            100: "#FFF2F2",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
