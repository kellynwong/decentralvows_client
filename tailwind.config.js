/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ['"Space Mono"', "monospace"],
        chakra: ['"Chakra Petch"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
