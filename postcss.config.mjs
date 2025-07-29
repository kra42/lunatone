/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // The error message indicates this should be '@tailwindcss/postcss'
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
