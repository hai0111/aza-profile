import moment from 'moment'
import mongoose, { Schema } from 'mongoose'

export interface IDiary {
	content: string
	day: Date
	interest: boolean
}

interface IDialySchema extends Schema, IDiary {}

const DiarySchema = new Schema<IDialySchema>({
	content: {
		type: String,
		required: [true, 'Please provide a name for this diary'],
	},
	day: {
		type: Date,
		required: [true, 'Please provide a date for this diary'],
	},
	interest: {
		type: Boolean,
		required: true,
	},
})

const DiaryModel =
	mongoose.models.Diary || mongoose.model<IDialySchema>('Diary', DiarySchema)

export default DiaryModel
