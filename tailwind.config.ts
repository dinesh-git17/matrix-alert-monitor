// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "ui-sans-serif", "system-ui"],
        mono: ["Menlo", "ui-monospace"],
      },
      colors: {
        matrixGreen: "#00FF41",
      },
    },
  },
  plugins: [],
};
export default config;
