/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
    extend: {
      screens: {
        "3xl": "1600px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cream: {
          DEFAULT: "hsl(var(--cream))",
          50: "hsl(40 40% 96%)",
          100: "hsl(40 40% 94%)", // Base cream
          200: "hsl(40 30% 90%)",
          300: "hsl(40 30% 80%)",
          400: "hsl(40 30% 70%)",
          500: "hsl(40 30% 60%)",
          600: "hsl(40 30% 50%)",
          700: "hsl(40 30% 40%)",
          800: "hsl(40 30% 30%)",
          900: "hsl(40 30% 20%)",
        },
        sage: {
          DEFAULT: "hsl(var(--sage))",
          50: "hsl(100 20% 96%)",
          100: "hsl(100 20% 90%)",
          200: "hsl(100 20% 80%)",
          300: "hsl(100 25% 70%)",
          400: "hsl(100 25% 60%)",
          500: "hsl(100 25% 50%)",
          600: "hsl(100 25% 40%)",
          700: "hsl(100 35% 30%)", // sage-dark approx
          800: "hsl(100 35% 20%)",
          900: "hsl(100 35% 10%)",
        },
        "sage-dark": "hsl(var(--sage-dark))",
        forest: {
          DEFAULT: "hsl(var(--forest))",
          50: "hsl(100 30% 96%)",
          100: "hsl(100 30% 90%)",
          200: "hsl(100 30% 80%)",
          300: "hsl(100 30% 70%)",
          400: "hsl(100 30% 60%)",
          500: "hsl(100 40% 50%)",
          600: "hsl(100 45% 40%)",
          700: "hsl(100 45% 30%)",
          800: "hsl(100 45% 25%)", // Base forest
          900: "hsl(100 50% 20%)", // Darker forest
          950: "hsl(100 50% 10%)",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          50: "hsl(40 70% 95%)",
          100: "hsl(40 70% 90%)",
          200: "hsl(40 70% 80%)",
          300: "hsl(40 70% 70%)",
          400: "hsl(40 70% 60%)",
          500: "hsl(40 70% 50%)", // Base gold
          600: "hsl(40 70% 45%)",
          700: "hsl(40 70% 35%)",
          800: "hsl(40 70% 25%)",
          900: "hsl(40 70% 15%)",
        },
        "cotton-white": "hsl(var(--cotton-white))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
