import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const myAxios = axios.create({
	baseURL: '/',
	timeout: 5000,
})

myAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	return config
})

myAxios.interceptors.response.use((response: AxiosResponse) => {
	return response
})

export default myAxios
