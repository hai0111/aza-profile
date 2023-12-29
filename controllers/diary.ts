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

	static async update(id: string, data: any) {
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

	static async totalRecords() {
		return await DiaryModel.countDocuments({})
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
			const data = await DiaryModel.find(query)
				.sort({ day: -1 })
				.limit(size)
				.skip((index - 1) * size)
			return {
				items: data,
				page: {
					index,
					size,
					totalRecords: await this.totalRecords(),
				},
			}
		} catch (err) {
			throw err
		}
	}

	static async delete(id: string) {
		return await DiaryModel.findByIdAndDelete(id)
	}
}

export default DiaryController
