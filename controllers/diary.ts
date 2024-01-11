import DiaryModel, { IDiary } from '@/models/Diary'
import moment from 'moment'
import { Document } from 'mongoose'

class DiaryController {
	async create(body: IDiary) {
		const user = new DiaryModel(body)
		return await user.save()
	}

	async findById(id: string) {
		return await DiaryModel.findById(id)
	}

	async update(id: string, data: any) {
		try {
			const dialy = await this.findById(id)
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
			// throw error
		}
	}

	async totalRecords() {
		return await DiaryModel.countDocuments({})
	}

	async list({
		fromDate,
		toDate,
		size = 20,
		index = 1,
	}: {
		fromDate: null | string
		toDate: null | string
		size?: number
		index?: number
	}) {
		let queryByDate: any = {}
		const query: any = {}
		if (fromDate) queryByDate.$gte = moment(fromDate).startOf('D').toDate()
		if (toDate) queryByDate.$lte = moment(toDate).endOf('D').toDate()

		if (Object.keys(queryByDate).length) query.day = queryByDate

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

	async delete(id: string) {
		return await DiaryModel.findByIdAndDelete(id)
	}
}

export default new DiaryController()
