/** @type {import('tailwindcss').Config} */
module.exports = {
  // This 'content' array is the critical fix.
  // It tells Tailwind to look for classes in these files.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};