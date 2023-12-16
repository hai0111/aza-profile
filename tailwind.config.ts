import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ultils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundColor: {
        dark: "rgb(32, 32, 35)",
        light: "rgb(240, 231, 219)",
      },
      textColor: {
        light: "#1A202C",
        dark: "#ffffffeb",
      },
    },
  },
  plugins: [],
};
export default config;
