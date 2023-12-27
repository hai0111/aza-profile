import moment from 'moment'
import mongoose, { Document, Schema } from 'mongoose'

export interface IDiary {
	content: string
	day: string
	interest: boolean
}

interface IDialySchema extends Schema, IDiary {}

const checkDate = (val: string) => {
	return moment(val, 'DD/MM/YYYY HH:mm').isValid()
}

const DiarySchema = new Schema<IDialySchema>({
	content: {
		type: String,
		required: [true, 'Please provide a name for this diary'],
	},
	day: {
		type: String,
		required: [true, 'Please provide a date for this diary'],
		validate: [checkDate, 'Please enter the correct date format'],
	},
	interest: {
		type: Boolean,
		required: true,
	},
})

const DiaryModel =
	mongoose.models.Diary || mongoose.model<IDialySchema>('Diary', DiarySchema)

export default DiaryModel
