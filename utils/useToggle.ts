import React, { useEffect, useState } from 'react'

const useToggle = (duration: number | undefined = 1000) => {
	const [enabled, setEnabled] = useState(false)
	useEffect(() => {
		const time = setInterval(() => {
			setEnabled((val) => !val)
		}, duration)
		return () => clearInterval(time)
	}, [])
	return { toggle: enabled }
}

export default useToggle
