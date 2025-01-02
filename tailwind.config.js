/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB',
        'secondary': '#7C3AED',
        'accent': '#F59E0B',
      },
    },
  },
  daisyui: {
    themes: [
      {
        it4b: {
          "primary": "#2563EB",
          "secondary": "#7C3AED",
          "accent": "#F59E0B",
          "neutral": "#F3F4F6",
          "base-100": "#FFFFFF",
          "info": "#3B82F6",
          "success": "#22C55E",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
