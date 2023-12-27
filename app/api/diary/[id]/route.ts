import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	const body = await request.json()
	return Response.json(await DiaryController.update(params.id, body))
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	return Response.json(await DiaryController.delete(params.id))
}
