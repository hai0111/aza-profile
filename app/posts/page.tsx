'use client'
import Container from '@/components/Container'
import Banner from '@/components/posts/Banner'
import PostItem from '@/components/posts/Item'
import { IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { useLoad } from '@/services/apiHandler'
import { findAndDelete } from '@/utils'
import CheckAuthWrapper from '@/utils/CheckAuth'
import InfiniteScroll from '@/utils/InfiniteScroll'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
	// Load data controller ==================================
	const [items, setItems] = useState<IPostResponse[]>([])
	const pageInfo = useRef({
		index: 0,
		size: 10,
	})

	const allowLoadMore = useRef<boolean>(true)
	const refScroll = useRef({ scrollToTop() {} })

	const { loading, handler: getData } = useLoad(async (init = items) => {
		pageInfo.current.index += 1
		const res = await myAxios.get('/posts', {})
		setItems([...init, ...res.data.items])
		const { size, index, totalRecords } = res.data.page
		allowLoadMore.current =
			(index - 1) * size + res.data.items.length < totalRecords
	})

	useEffect(() => {
		if (!loading) {
			pageInfo.current.index = 0
			allowLoadMore.current = true
			getData([])
			refScroll.current.scrollToTop()
		}
	}, [])

	// Delete controller
	const {
		isOpen: isOpenDelete,
		onOpen,
		onOpenChange,
		onClose,
	} = useDisclosure()
	const itemDelete = useRef<IPostResponse>()
	useEffect(() => {
		if (!isOpenDelete) itemDelete.current = undefined
	}, [isOpenDelete])

	const handleDelete = async () => {
		const { current: item } = itemDelete
		if (!item) return
		const itemsClone = [...items]
		setItems((items) => {
			findAndDelete(items, ({ _id }) => _id === item._id)
			return items
		})
		onClose()
		try {
			await myAxios.delete(`/posts/${item._id}`)
			toast('Delete successfully', {
				type: 'success',
			})
		} catch (err) {
			setItems(() => itemsClone)
			toast('Delete failed', {
				type: 'error',
			})
		}
	}

	const onActiveDelete = (id: string) => {
		itemDelete.current = items.find(({ _id }) => _id === id)
		if (itemDelete.current) onOpen()
	}

	return (
		<>
			<Banner />
			<CheckAuthWrapper>
				<div className="flex justify-center pt-8">
					<Link href="/posts/create">
						<Button className="font-medium" color="success">
							Add Post
						</Button>
					</Link>
				</div>
			</CheckAuthWrapper>

			<InfiniteScroll
				allowScroll={allowLoadMore.current}
				className="max-h-[1000px]"
				loadMore={getData}
				ref={refScroll}
			>
				<Container className="pt-10 grid grid-cols-2 gap-3">
					{items.map((item) => (
						<PostItem
							key={item._id}
							data={item}
							onActiveDelete={onActiveDelete}
						/>
					))}
				</Container>
			</InfiniteScroll>

			<Modal isOpen={isOpenDelete} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader />
					<ModalBody>
						Are you sure you want to delete the post titled:
						<div>"{itemDelete.current?.title}"?</div>
					</ModalBody>
					<ModalFooter>
						<Button className="bg-transparent" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleDelete} color="danger">
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default page
