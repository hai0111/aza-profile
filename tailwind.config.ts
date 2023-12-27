import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./ultils/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			backgroundColor: {
				dark: 'rgb(32, 32, 35)',
				light: 'rgb(240, 231, 219)',
			},
			textColor: {
				light: '#1A202C',
				dark: '#ffffffeb',
			},
		},
	},
	plugins: [nextui()],
}
export default config
