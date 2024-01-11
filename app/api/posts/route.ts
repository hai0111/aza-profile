import postController from '@/controllers/post'
import dbConnect from '@/lib/dbConnect'
import { checkAuthAPI, getQuery } from '@/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	await dbConnect()
	const query = getQuery(request)
	return Response.json(await postController.list(query as any))
}

export async function POST(request: NextRequest) {
	return await checkAuthAPI(async () => {
		await dbConnect()
		const body = await request.json()
		const res = await postController.create(body)
		return Response.json(res)
	})
}
