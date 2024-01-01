import { useState } from 'react'

const useLoad = <T = any>(
	fn: (...p: any) => Promise<T>,
	errorHandler?: () => void
) => {
	const [loading, setLoading] = useState(false)
	return {
		loading,
		setLoading,
		handler: async (...p: any) => {
			setLoading(true)
			await apiHandler(() => fn(...p), errorHandler)
			setLoading(false)
		},
	}
}

const apiHandler = async <T = any>(
	fn: () => Promise<T>,
	errorHandler?: () => void
) => {
	try {
		await fn()
	} catch (err) {
		console.log(err)
		if (errorHandler) errorHandler()
	}
}

export { apiHandler, useLoad }
