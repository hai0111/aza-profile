import PostModel, { IPost, IPostRespon } from '@/models/Post'
import moment from 'moment'

export class PostController {
	static async create(body: IPost) {
		const post = new PostModel(body)
		return await post.save()
	}

	static async delete(id: string) {
		return await PostModel.findByIdAndDelete(id)
	}

	static async update(body: IPostRespon) {
		return await PostModel.findByIdAndUpdate(body._id, body)
	}

	static async totalRecords(query: { [key: string]: any }) {
		return await PostModel.countDocuments(query)
	}

	static async list({
		fromDate,
		toDate,
		slug,
		size = 20,
		index = 1,
	}: {
		fromDate: null | string
		toDate: null | string
		slug: null | string
		size?: number
		index?: number
	}) {
		let queryByDate: any = {}
		const query: any = {}

		if (slug) query.slug = slug
		if (fromDate) queryByDate.$gte = moment(fromDate).startOf('D').toDate()
		if (toDate) queryByDate.$lte = moment(toDate).endOf('D').toDate()
		if (Object.keys(queryByDate).length) query.day = queryByDate

		try {
			const data = await PostModel.find(query)
				.sort({ createAt: -1 })
				.limit(size)
				.skip((index - 1) * size)

			return {
				items: data,
				page: {
					index,
					size,
					totalRecords: await this.totalRecords(query),
				},
			}
		} catch (err) {
			throw err
		}
	}
}
