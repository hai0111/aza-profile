import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'
import { getQuery } from '@/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	await dbConnect()
	const query = getQuery(request)

	return new Response(JSON.stringify(await DiaryController.list(query)))
}

export async function POST(request: NextRequest) {
	await dbConnect()
	const body = await request.json()
	const res = await DiaryController.create(body)
	return Response.json(res)
}
