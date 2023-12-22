import { FC, ReactNode, useEffect, useState } from 'react'

export const ClientOnly: FC<{ children: ReactNode }> = ({ children }) => {
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		setLoaded(true)
	}, [])
	return loaded ? children : null
}
