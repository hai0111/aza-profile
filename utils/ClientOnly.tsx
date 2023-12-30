import { FC, ReactNode, useEffect, useState } from 'react'

const ClientOnly: FC<{ children: ReactNode }> = ({ children }) => {
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		setLoaded(true)
	}, [])
	return loaded ? children : null
}

export default ClientOnly
