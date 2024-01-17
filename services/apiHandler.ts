import { useState } from 'react'

const useLoad = <T = any>(
	fn: (...p: any) => Promise<T>,
	errorHandler?: (err?: any) => any
) => {
	const [loading, setLoading] = useState(false)
	return {
		loading,
		setLoading,
		handler: async (...p: any) => {
			setLoading(() => true)
			await apiHandler(() => fn(...p), errorHandler)
			setLoading(() => false)
		},
	}
}

const apiHandler = async <T = any>(
	fn: () => Promise<T>,
	errorHandler?: (err?: any) => any
) => {
	try {
		await fn()
	} catch (err) {
		if (errorHandler) errorHandler(err)
	}
}

export { apiHandler, useLoad }
