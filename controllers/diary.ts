import DiaryModel, { IDiary } from '@/models/Diary'
import { Document, Query } from 'mongoose'

class DiaryController {
	static async create(body: IDiary) {
		const user = new DiaryModel(body)
		return await user.save()
	}

	static async findById(id: string) {
		return await DiaryModel.findById(id)
	}

	async update(id: string, data: any) {
		try {
			const dialy = await DiaryController.findById(id)
			if (dialy) {
				for (const key in data) {
					if (typeof data[key] === typeof dialy[key as keyof Document])
						dialy[key as keyof Document] = data[key]
				}
				return await dialy.save()
			} else {
				throw 'Dialy not found'
			}
		} catch (error) {
			throw error
		}
	}

	static async list({
		query = {},
		size = 20,
		index = 1,
	}: {
		query?: { [key: string]: any }
		size?: number
		index?: number
	}) {
		try {
			return DiaryModel.find(query)
				.limit(size)
				.skip((index - 1) * size)
		} catch (err) {
			throw err
		}
	}

	async delete() {}
}

export default DiaryController
