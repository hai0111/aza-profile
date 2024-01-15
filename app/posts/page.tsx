'use client'
import Container from '@/components/Container'
import Banner from '@/components/posts/Banner'
import PostItem from '@/components/posts/Item'
import { IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { useLoad } from '@/services/apiHandler'
import CheckAuthWrapper from '@/utils/CheckAuth'
import InfiniteScroll from '@/utils/InfiniteScroll'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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
						<PostItem key={item._id} data={item} />
					))}
				</Container>
			</InfiniteScroll>
		</>
	)
}

export default page
