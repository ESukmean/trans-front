import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      sans: [
        "KoPub Dotum",
        "KoPub Dotum Medium",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "KoPub Batang",
        "KoPub Batang Medium",
        "ui-serif",
        "Georgia",
        "Cambria",
        'Times New Roman"',
        "Times",
        "serif",
      ],
    },
  },

  plugins: [],
} satisfies Config;
