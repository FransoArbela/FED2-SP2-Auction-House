export default {
  content: ["./index.html", "./src/**/*.{js,ts,html}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: "0.7rem",
      sm: "0.9rem",
      lg: "1.3rem",
      xl: "1.5rem",
    },
    extend: {
      fontSize: {
        tiny: "0.625rem",
        huge: "3.5rem",
        massive: "5rem",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "rgba(var(--color-bg))",
          fg: "rgba(var(--color-fg))",
          muted: "rgba(var(--color-muted))",
          border: "rgba(var(--color-border))",
          primary: "rgba(var(--color-primary))",
          primaryFg: "rgba(var(--color-primary-hover))",
          secondary: "rgba(var(--color-secondary))",
          secondaryFg: "rgba(var(--color-secondary-hover))",
          shadowMd: "rgba(var(--shadow-md))",
          shadowColor: "rgba(var(--shadow-color))",
          shadowLg: "rgba(var(--shadow-lg))",
          cardHover: "rgba(var(--color-card-hover))",
          hColor: "rgba(var(--color-h-color))",
          paddingColor: "rgba(var(--color-padding-color))",
        },
        accent: {
          light: "#FCD34D",
          DEFAULT: "#FBBF24",
          dark: "#B45309",
        },
      },
    },
  },
  plugins: [],
};
