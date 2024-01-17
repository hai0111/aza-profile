import myAxios from '@/services/apiClient'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const file = (await request.formData()).get('file') as File

		const formData = new FormData()
		const cloudName = process.env.CLOUDINARY_NAME
		formData.set('file', file)
		formData.set('api_key', process.env.CLOUDINARY_API_KEY!)
		formData.set('upload_preset', process.env.CLOUDINARY_PRESET!)
		formData.set('public_id', file.name.replace(/\.\w+$/, ''))

		const res = await myAxios.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			formData
		)

		return Response.json({
			url: res.data?.url,
		})
	} catch (err) {
		console.log(err)

		return Response.json(
			{
				msg: 'Bad request',
			},
			{
				status: 400,
			}
		)
	}
}
