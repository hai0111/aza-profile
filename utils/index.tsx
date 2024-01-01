import moment from 'moment'
import { NextRequest } from 'next/server'

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
