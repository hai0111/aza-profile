'use client'

import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

type types = 'light' | 'dark'

interface IThemeContext {
	theme: types
	setTheme(theme: types): void
	toggle(): void
}

const initialContext: IThemeContext = {
	theme: 'dark',
	setTheme() {},
	toggle() {},
}

export const ThemeContext = createContext<IThemeContext>(initialContext)

const ThemeProvider: FC<{ children: ReactNode; initialValue: string }> = ({
	children,
	initialValue,
}) => {
	const [theme, setTheme] = useState<types>(initialValue as types)
	const data: IThemeContext = {
		theme,
		setTheme: (theme: types) => {
			setTheme(theme)
		},
		toggle: () => {
			setTheme(theme === 'light' ? 'dark' : 'light')
		},
	}

	useEffect(() => {
		Cookies.set('theme', theme)
		document.documentElement.className = theme
	}, [theme])

	return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
