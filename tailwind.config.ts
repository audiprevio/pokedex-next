import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)'
      },
      fontFamily: {
        pokefont: ["var(--font-pokefont)"]
      },
      colors: {
        pokeBody: "#142C2E",
        poketitleBG: "#DF1818",
        pokeBorder: "#CAC1C2",
        pokeTitle: "#DCE8E6",
        pokeNavBG: "#F0EDE5",
        pokeboxBG: "#F8E0D0",
        cardBG: "#F8F8F7",
        pcBoxSecondary: "#9090A8",
        pcBoxPrimary: "#707078"
      },
    },
  },
  plugins: [],
}
export default config
