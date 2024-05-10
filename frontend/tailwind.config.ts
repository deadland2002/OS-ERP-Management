import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui({
    prefix: "nextui",
    addCommonColors: false,
    defaultTheme: "dark",
    defaultExtendTheme: "dark",
    themes: {
      light: {
        colors: {
          danger:{
            foreground:'#FFFFFF',
          },
          default:{
            foreground:"#011222",
          },
          background: "#ffffff",
          foreground: "#000000",
          primary: {
            foreground: "#ffffff",
            DEFAULT: "#7364FF",
            50: '#ECEFFF',
            100: '#DDE1FF',
            200: '#C2C8FF',
            300: '#9CA2FF',
            400: '#7875FF',
            500: '#7364FF',
            600: '#5836F5',
            700: '#4C2AD8',
            800: '#3D25AE',
            900: '#352689',
          },
          secondary:{
            foreground: "#ffffff",
            DEFAULT : "#EEEEEE",
            50: '#f3f3f3',
            100: '#e7e7e7',
            200: '#dadada',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          }
        },
      },
    },
  }),]
};
export default config;
