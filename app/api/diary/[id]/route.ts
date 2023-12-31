import DiaryController from '@/controllers/diary'
import dbConnect from '@/lib/dbConnect'
import { checkAuthAPI } from '@/utils'
import moment from 'moment'

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	return await checkAuthAPI(async () => {
		await dbConnect()
		const body = await request.json()
		body.day = moment(body.day).toDate()
		return Response.json(await DiaryController.update(params.id, body))
	})
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	return await checkAuthAPI(async () => {
		await dbConnect()
		return Response.json(await DiaryController.delete(params.id))
	})
}
