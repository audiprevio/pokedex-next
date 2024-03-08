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
        pokedexBG: "#E3DCC1",
        pokeBG: "#99A64D",
        cardBG: "#F8F8F7",
      },
    },
  },
  plugins: [],
}
export default config
