/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  safelist: [
    { pattern: /.*/ }, // Allows all Tailwind classes
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './utility/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fontFamily: {
          sans: ['Inter', 'system-ui'],
        },
        boxShadow: {
          'soft': '0 12px 40px -4px rgba(0,0,0,0.08)',
          'hard': '0 0 0 1px rgba(0,0,0,0.1)',
        },
        transitionDuration: {
          '250': '250ms',
          '400': '400ms',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ]
};
