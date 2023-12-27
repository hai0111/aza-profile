import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'

export async function GET() {
	await dbConnect()
	return Response.json(await DiaryController.list({}))
}

export async function POST(request: Request) {
	const body = await request.json()
	return Response.json(body)
}
