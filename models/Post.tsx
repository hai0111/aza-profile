import mongoose, { Schema } from 'mongoose'

export interface IPost {
	content: string
	title: string
	thumnail: string
	slug: string
	relateds?: Schema.Types.ObjectId[]
}

export interface IPostRespon extends IPost {
	_id: string
	createAt: string
	updateAt: string
}

interface IPostSchema extends Schema, IPost {}

const PostSchema = new Schema<IPostSchema>(
	{
		content: {
			type: String,
			required: [true, 'Content required'],
		},
		title: {
			type: String,
			required: [true, 'Content required'],
		},
		thumnail: {
			type: String,
			required: [true, 'Content required'],
		},
		slug: {
			type: String,
			required: [true, 'Content required'],
		},
		relateds: {
			type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		},
	},
	{
		timestamps: true,
	}
)

const PostModel =
	mongoose.models.Post || mongoose.model<IPostSchema>('Post', PostSchema)

export default PostModel
