import myAxios from '@/services/apiClient'
import moment from 'moment'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export const getQuery = (request: NextRequest) => {
	const { searchParams } = request.nextUrl
	const query: { [key: string]: any } = {}
	searchParams.forEach((val, key) => {
		query[key] = val
	})
	return query
}

export const blockFuture = (date: Date) => moment(date).isSameOrBefore(moment())

export const ifIsString = (val: any) =>
	typeof val === 'string' ? val : undefined

export const checkAuthAPI = async (fn: Function) => {
	const session = await getServerSession()
	if (!session)
		return Response.json(null, {
			status: 403,
			statusText: 'Permission denied',
		})
	return await fn()
}

export const toSlug = (str: string) => {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase()

	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, '') // xóa các ký tự dấu sau khi tách tổ hợp

	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd')

	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '')

	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-')

	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-')

	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '')

	// return
	return str
}

export const findAndToggle = <T = any,>(
	array: T[],
	item: T,
	fn: (item: T) => boolean
) => {
	for (let index = 0; index < array.length; index++) {
		if (fn(array[index])) {
			array.splice(index, 1)
			return
		}
	}

	array.push(item)
	return
}

export const uploadFile = async (file: File, errCallback?: () => void) => {
	const formData = new FormData()
	formData.set('file', file)
	const res = await myAxios.post('/upload', formData)
	return res.data?.url
}

export const findAndReplace = <T = any,>(
	array: T[],
	item: T,
	fn: (item: T) => boolean
) => {
	for (let index = 0; index < array.length; index++) {
		if (fn(array[index])) {
			array[index] = item
			break
		}
	}
}

export const findAndDelete = <T = any,>(
	array: T[],
	fn: (item: T) => boolean
) => {
	for (let index = 0; index < array.length; index++) {
		if (fn(array[index])) {
			array.splice(index, 1)
			break
		}
	}
}
