import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	await dbConnect()
	const { searchParams } = request.nextUrl
	console.log(searchParams)
	return new Response(JSON.stringify(await DiaryController.list({})), {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': 'https://nextjs.org/',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	})
}

export async function POST(request: NextRequest) {
	await dbConnect()
	const body = await request.json()
	const res = await DiaryController.create(body)
	return Response.json(res)
}
