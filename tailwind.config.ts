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
        poketitleBG: "#40F7F9",
        pokeBorder: "#CAC1C2",
        pokeTitle: "#DCE8E6",
        pokeBG: "#B3FFFF",
      },
    },
  },
  plugins: [],
}
export default config
