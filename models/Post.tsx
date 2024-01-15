import mongoose, { Schema } from 'mongoose'

export interface IPost {
	content: string
	title: string
	thumbnail: string
	postsRelated?: string[]
}

export interface IPostResponse extends IPostComplete {
	_id: string
	createAt: string
	updateAt: string
}

export interface IPostComplete extends IPost {
	slug: string
}

interface IPostSchema extends Schema, IPostComplete {}

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
		slug: {
			type: String,
			required: [true, 'Content required'],
		},
		thumbnail: {
			type: String,
			required: [true, 'Content required'],
		},
		postsRelated: {
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
