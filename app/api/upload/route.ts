import myAxios from '@/services/apiClient'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const file = (await request.formData()).get('file') as File

		const formData = new FormData()
		formData.set('file', file)
		formData.set('api_key', process.env.CLOUDINARY_API_KEY!)
		formData.set('upload_preset', process.env.CLOUDINARY_PRESET!)
		formData.set('public_id', file.name)

		const res = await myAxios.post(
			'https://api.cloudinary.com/v1_1/da1yqemi7/image/upload',
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
