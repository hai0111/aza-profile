import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'
import moment from 'moment'

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	const body = await request.json()
	body.day = moment(body.day).toDate()
	return Response.json(await DiaryController.update(params.id, body))
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await dbConnect()
	return Response.json(await DiaryController.delete(params.id))
}
