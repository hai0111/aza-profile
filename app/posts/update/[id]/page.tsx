'use client'
import Container from '@/components/Container'
import CustomEditor from '@/components/CustomEditor'
import CustomLink from '@/components/CustomLink'
import MultipleAutoComplete from '@/components/MultipleAutoComplete'
import Banner from '@/components/posts/Banner'
import UploadFile from '@/components/upload/UploadFile'
import { IPost, IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { apiHandler, useLoad } from '@/services/apiHandler'
import {
	Button,
	CircularProgress,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

interface IPostBodyUpdate extends Omit<IPost, 'postsRelated'> {
	postsRelated: IPostResponse[]
}

const list: IPostResponse[] = []

const page = ({ params }: { params: { id: string } }) => {
	const router = useRouter()
	// Form controller
	const { loading, handler: onSubmit } = useLoad(
		async (values: IPost) => {
			const postsRelated = (values.postsRelated as any[])?.map(({ _id }) => _id)
			values.postsRelated = postsRelated
			await myAxios.put(`/posts/${idRef.current}`, { ...values, postsRelated })
			toast('Successfully', {
				type: 'success',
			})
			router.push('/posts')
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

	const formik = useFormik<IPostBodyUpdate>({
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

	// Initialize update data
	const idRef = useRef<string>()
	const { loading: loadData, handler: getData } = useLoad(async () => {
		myAxios.get(`/posts/${params.id}`).then(({ data }) => {
			formik.setValues(data)
			idRef.current = data._id
		})
	})
	useEffect(() => {
		getData()
	}, [])

	// Delete controller
	const {
		isOpen: isOpenDelete,
		onOpen,
		onOpenChange,
		onClose,
	} = useDisclosure()

	const { loading: loadingDelete, handler: handleDelete } = useLoad(
		async () => {
			try {
				await myAxios.delete(`/posts/${params.id}`)
				toast('Delete successfully', {
					type: 'success',
				})
				router.push('/posts')
			} catch (err) {
				toast('Delete failed', {
					type: 'error',
				})
			}
		}
	)

	if (loadData) {
		return (
			<div className="py-10 flex justify-center">
				<CircularProgress color="warning" />
			</div>
		)
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
					<UploadFile
						value={formik.values.thumbnail}
						onValueChange={handleChangeThumbnail}
					/>
					<div className="text-tiny text-danger">
						{formik.touched.thumbnail && formik.errors.thumbnail}
					</div>
				</div>

				<div className="mt-4">
					<CustomEditor
						value={formik.values.content}
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
						values={formik.values.postsRelated}
						items={postList}
						field="title"
						placeholder="Search by title..."
						onSearch={handleSearchPosts}
						onChange={handleChangeRelatedPosts}
					/>
				</div>

				<div className="flex justify-end mt-10 gap-2">
					<CustomLink size="lg" link={'/posts'}>
						Back to Posts
					</CustomLink>
					<Button size="lg" color="danger" onClick={onOpen}>
						Delete
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

			<Modal
				isOpen={isOpenDelete}
				onOpenChange={onOpenChange}
				isDismissable={!loadingDelete}
				hideCloseButton={loadingDelete}
			>
				<ModalContent>
					<ModalHeader />
					<ModalBody>Are you sure you want to delete this post?</ModalBody>
					<ModalFooter>
						<Button
							isDisabled={loadingDelete}
							className="bg-transparent"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							isLoading={loadingDelete}
							onClick={handleDelete}
							color="danger"
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default page
