'use client'
import Container from '@/components/Container'
import CustomEditor from '@/components/CustomEditor'
import MultipleAutoComplete from '@/components/MultipleAutoComplete'
import Banner from '@/components/posts/Banner'
import UploadFile from '@/components/upload/UploadFile'
import { IPost, IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { apiHandler, useLoad } from '@/services/apiHandler'
import useRedirect from '@/utils/useRedirect'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const list: IPostResponse[] = []

const page = () => {
	// Form controller
	const { loading, handler: onSubmit } = useLoad(
		async (values: IPost) => {
			const postsRelated = (values.postsRelated as any[])?.map(({ _id }) => _id)
			values.postsRelated = postsRelated
			await myAxios.post('posts', { ...values, postsRelated })
			toast('Successfully', {
				type: 'success',
			})
			useRedirect('/posts')
		},
		(err) => {
			toast('Some thing went wrong', {
				type: 'error',
			})
			throw err
		}
	)

	const validationSchema = Yup.object().shape({
		content: Yup.string().required('Content is required'),
		thumbnail: Yup.string().required('Thumbnail is required'),
		title: Yup.string().required('Title is required'),
	})

	const formik = useFormik<IPost>({
		initialValues: {
			content: '',
			thumbnail: '',
			title: '',
			postsRelated: [],
		},
		onSubmit,
		validationSchema,
	})

	// Related posts controller
	const [postList, setPostList] = useState<IPostResponse[]>([...list])
	const controller = useRef(new AbortController())

	const handleSearchPosts = (query: string) => {
		apiHandler(async () => {
			controller.current.abort()
			const {
				data: { items },
			} = await myAxios.get('/posts', {
				params: {
					title: query,
				},
			})

			setPostList(items)
		})
	}

	useEffect(() => {
		handleSearchPosts('')
	}, [])

	const handleChangeRelatedPosts = (values: IPostResponse[]) => {
		formik.setFieldValue('postsRelated', values)
	}

	// Thumbnail controller
	const handleChangeThumbnail = (val: string) => {
		formik.setFieldValue('thumbnail', val)
	}

	return (
		<>
			<Banner />
			<Container className="pt-4">
				<Input
					name="title"
					placeholder="Title"
					size="sm"
					value={formik.values.title}
					onChange={(e) => {
						formik.setFieldTouched('title', true)
						formik.handleChange(e)
					}}
					errorMessage={formik.touched.title && formik.errors.title}
				/>

				<div className="mt-4">
					<UploadFile onValueChange={handleChangeThumbnail} />
					<div className="text-tiny text-danger">
						{formik.touched.thumbnail && formik.errors.thumbnail}
					</div>
				</div>

				<div className="mt-4">
					<CustomEditor
						onChange={(val) => {
							formik.setFieldTouched('content', true)
							formik.setFieldValue('content', val)
						}}
					/>

					<div className="text-tiny text-danger">
						{formik.touched.content && formik.errors.content}
					</div>
				</div>

				<div className="mt-4">Related Articles</div>
				<div className="mt-2">
					<MultipleAutoComplete<IPostResponse>
						items={postList}
						field="title"
						placeholder="Search by title..."
						onSearch={handleSearchPosts}
						onChange={handleChangeRelatedPosts}
					/>
				</div>

				<div className="flex justify-end mt-10 gap-2">
					<Link href={'/posts'}>
						<Button size="lg">Back to Posts</Button>
					</Link>
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
		</>
	)
}

export default page
