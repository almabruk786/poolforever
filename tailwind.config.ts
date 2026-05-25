import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#03080f",
        ink: "#07111c",
        aqua: "#13c8f2",
        lagoon: "#0a7da0",
        pearl: "#f5fbff",
        mist: "rgba(255,255,255,.08)"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(19, 200, 242, .28)",
        glass: "0 24px 80px rgba(0, 0, 0, .35)"
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        ripple: "ripple 2.8s ease-out infinite",
        shimmer: "shimmer 7s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        ripple: {
          "0%": { transform: "scale(.7)", opacity: ".65" },
          "100%": { transform: "scale(1.45)", opacity: "0" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      }
    }
  },
  plugins: []
};

export default config;
