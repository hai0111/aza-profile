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
		'./node_modules/primereact/**/*.{js,ts,jsx,tsx}',
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
			keyframes: {
				'expand-y': {
					'0%': { transform: 'scaleY(0)' },
					'100': { transform: 'scaleY(100%)' },
				},
				blink: {
					'0%': { opacity: '0' },
					'50%': { opacity: '0' },
					'100': { opacity: '1' },
				},
			},
			animation: {
				'expand-y': 'expand-y 1s ease-in-out',
				blink: 'blink 800ms ease infinite',
			},
		},
	},
	plugins: [nextui()],
}
export default config
