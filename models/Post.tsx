import mongoose, { Schema } from 'mongoose'

export interface IPost {
	content: string
	title: string
	thumbnail: string
	postsRelated?: string[]
}

export interface IPostComplete extends IPost {
	slug: string
}

export interface IPostResponse extends Omit<IPostComplete, 'postsRelated'> {
	_id: string
	createAt: string
	updateAt: string
	postsRelated: IPostResponse[]
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

mongoose.deleteModel('Post')

const PostModel =
	mongoose.models.Post || mongoose.model<IPostSchema>('Post', PostSchema)

export default PostModel
