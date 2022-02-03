module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: "#FB784C",
      textColor: "#252C32",
      secondaryColor: "#393D46",
      cartText: "#5e5e5e",
      footerBg: "#232323",
      footerText: "#FFFFFF",
    },
    extend: {
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.37, 0, 0.63, 1)",
        "out-expo": "cubic-bezier(0, 0, 0.2, 1)",
      },
      animation: {
        opacity: "opacity 500ms ease-out",
        bouncing: "bouncing 2000ms ease-in-out infinite ",
      },
      keyframes: {
        opacity: {
          "0% 100%": {
            opacity: 1,
          },
          "20%": {
            opacity: 0.5,
          },
        },
        bouncing: {
          "0%,100%": {
            transform: "translateY(-5%)",
          },
          "50%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
