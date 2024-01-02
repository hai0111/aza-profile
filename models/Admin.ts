import mongoose, { Schema } from 'mongoose'

export interface IAdmin {
	username: string
	password: string
}

interface IAdminSchema extends Schema, IAdmin {}

const AdminSchema = new Schema<IAdminSchema>({
	username: {
		type: String,
		required: true,
		trim: true,
		maxlength: 20,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

const AdminModel =
	mongoose.models.Admin || mongoose.model<IAdminSchema>('Admin', AdminSchema)

export default AdminModel
