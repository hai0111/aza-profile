const apiHandler = (fn: (...p: any) => any) => {
	try {
		fn()
	} catch (error) {
		throw error
	}
}
export default apiHandler
