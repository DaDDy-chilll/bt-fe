/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2F667B",
        primarylight: "#42ACD5",
        primarydark: "#2E2D3F",
        secondarylight: "#49BDEA",
        secondarydark: "#545497",
        accent1: "#42ACD5",
        accent2: "#FF9208",
        accentblack: "#262424",
        accentwhite: "#FFFFFF",
        success: "#3FD868",
        danger: "#F43C3C",
        muted: "#E0E0E0",
        secondarydark: "#383746",
        label: "#6b7280",
      },
      backgroundImage: {
        'light_img': "url(@/assets/images/light_bg.jpg)",
        'dark_img': "url(@/assets/images/dark_bg.jpg)",
      }
    },
  },
  plugins: [],
}

