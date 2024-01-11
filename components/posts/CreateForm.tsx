'use client'
import Container from '@/components/Container'
import CustomEditor from '@/components/CustomEditor'
import { IPost, IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { useLoad } from '@/services/apiHandler'
import ClientOnly from '@/utils/ClientOnly'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import SelectMultiple from '../MultipleAutoComplete/MultipleAutoComplete'

const list: IPostResponse[] = [
	{
		_id: Math.random().toString(),
		content: 'dadas',
		thumbnail: 'dadas',
		title: 'das',
		postsRelated: [],
		createAt: moment().toString(),
		updateAt: moment().toString(),
	},
	{
		_id: Math.random().toString(),
		content: 'dadas',
		thumbnail: 'dadas',
		title: 'das',
		postsRelated: [],
		createAt: moment().toString(),
		updateAt: moment().toString(),
	},
	{
		_id: Math.random().toString(),
		content: 'dadas',
		thumbnail: 'dadas',
		title: 'das',
		postsRelated: [],
		createAt: moment().toString(),
		updateAt: moment().toString(),
	},
	{
		_id: Math.random().toString(),
		content: 'dadas',
		thumbnail: 'dadas',
		title: 'das',
		postsRelated: [],
		createAt: moment().toString(),
		updateAt: moment().toString(),
	},
]

const CreatePostForm = () => {
	const [postsRelated, setPostsRelated] = useState<IPostResponse[]>([])
	const [items, setItems] = useState<IPostResponse[]>([...list])
	const handleSearchPosts = async (query: string) => {
		setItems([...items])
	}

	const { loading, handler: onSubmit } = useLoad(
		async (values: IPost) => {
			values.thumbnail = '/images/post-banner.jpg'
			const res = myAxios.post('posts', values)
			toast('Successfully', {
				type: 'success',
			})
		},
		() => {
			toast('Some thing went wrong', {
				type: 'error',
			})
		}
	)

	const handleChange = (values: IPostResponse[]) => {
		setPostsRelated(values)
	}

	const formik = useFormik<IPost>({
		initialValues: {
			content: '',
			thumbnail: '',
			title: '',
			postsRelated: [],
		},
		onSubmit,
	})

	return (
		<Container className="pt-4">
			{JSON.stringify(formik.values)}
			<Input
				name="title"
				placeholder="Title"
				size="sm"
				value={formik.values.title}
				onChange={formik.handleChange}
			/>
			<div className="mt-4">
				<ClientOnly>
					<CustomEditor
						onChange={(val) => formik.setFieldValue('content', val)}
					/>
				</ClientOnly>
			</div>

			<div className="mt-4">Related Articles</div>
			<div className="mt-2">
				<SelectMultiple<IPostResponse>
					items={items}
					field="title"
					onSearch={handleSearchPosts}
					onChange={handleChange}
				/>
			</div>

			<div className="flex justify-end mt-10 gap-2">
				<Button size="lg" href="/posts">
					Back to Posts
				</Button>
				<Button size="lg" color="primary" onClick={() => formik.resetForm()}>
					Reset form
				</Button>
				<Button
					size="lg"
					className="font-medium"
					color="success"
					onClick={formik.submitForm}
					isLoading={loading}
				>
					Submit
				</Button>
			</div>
		</Container>
	)
}

export default CreatePostForm
