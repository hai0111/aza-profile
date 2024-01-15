import PostModel, { IPostComplete, IPostResponse } from '@/models/Post'
import { toSlug } from '@/utils'
import moment from 'moment'

class PostController {
	async create(body: IPostComplete) {
		const post = new PostModel(body)
		return await post.save()
	}

	async delete(id: string) {
		return await PostModel.findByIdAndDelete(id)
	}

	async update(id: string, body: IPostResponse) {
		return await PostModel.findByIdAndUpdate(id, body)
	}

	async totalRecords(query: { [key: string]: any }) {
		return await PostModel.countDocuments(query)
	}

	async list({
		fromDate,
		toDate,
		title = '',
		size = 20,
		index = 1,
	}: {
		fromDate: null | string
		toDate: null | string
		size?: number
		title?: string
		index?: number
	}) {
		let queryByCreatedAt: any = {}
		const query: any = {}

		if (title) query.slug = { $regex: toSlug(title) }

		if (fromDate) queryByCreatedAt.$gte = moment(fromDate).startOf('D').toDate()
		if (toDate) queryByCreatedAt.$lte = moment(toDate).endOf('D').toDate()
		if (Object.keys(queryByCreatedAt).length) query.createAt = queryByCreatedAt

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

	async detail(id: string) {
		return await PostModel.findById(id).populate('postsRelated')
	}
}

const postController = new PostController()
export default postController
