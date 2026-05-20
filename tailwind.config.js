/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Lexend Deca'", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#6C4EE5", dark: "#5436CC" },
        bg: "#F8F7FC",
        muted: "#6E6A7C",
        ink: "#24252C",
        divider: "#ECEAF3",
        pastel: {
          pink: "#FDE6EC",
          peach: "#FFE4D6",
          yellow: "#FFF4D6",
          mint: "#E6F7EE",
        },
        status: {
          done: "#2BB673",
          warn: "#F2994A",
          todo: "#EB5E8B",
        },
      },
      borderRadius: {
        card: "16px",
        chip: "12px",
        cta: "14px",
      },
      boxShadow: {
        card: "0 6px 14px rgba(60,40,120,.05)",
        cta: "0 12px 24px rgba(108,78,229,.35)",
      },
    },
  },
  plugins: [],
};
