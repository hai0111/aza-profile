import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
	await dbConnect()
	return Response.json(await DiaryController.list({}))
}

export async function POST(request: Request) {
	await dbConnect()
	const body = await request.json()
	const res = await DiaryController.create(body)
	return Response.json(res)
}
