import mongoose, { Schema } from 'mongoose'

export interface IPost {
	content: string
	title: string
	thumbnail: string
	postsRelated?: Schema.Types.ObjectId[]
}

export interface IPostResponse extends IPost {
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
