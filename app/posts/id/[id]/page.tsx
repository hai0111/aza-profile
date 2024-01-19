'use client'
import Container from '@/components/Container'
import RelatedArticles from '@/components/posts/RelatedArticles'
import { IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { CircularProgress, Image } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'

import '@/components/CustomEditor/CustomEditor.scss'
import { useLoad } from '@/services/apiHandler'
import '@/styles/ck-editor.scss'

const page = ({ params }: { params: { id: string } }) => {
	const [data, setData] = useState<IPostResponse | null>(null)

	const { loading, handler: getData } = useLoad(async () => {
		myAxios.get(`/posts/${params.id}`).then(({ data }) => {
			setData(data)
		})
	})

	useEffect(() => {
		getData()
	}, [])

	if (loading) {
		return (
			<div className="pb-10 pt-60 flex justify-center">
				<CircularProgress color="warning" />
			</div>
		)
	}

	return (
		data && (
			<Container className="pt-16">
				<Image
					className="aspect-[9/5] object-cover"
					src={data.thumbnail}
					alt=""
				/>

				<h2 className="text-2xl pt-6 flex items-center gap-2">
					<Link href={'/posts'} className="text-blue-400">
						Posts
					</Link>
					<GoChevronRight /> {data.title}
				</h2>
				<div className="ck ck-editor__main">
					<div
						className="pt-10 ck-content"
						dangerouslySetInnerHTML={{ __html: data.content }}
					/>
				</div>
				{!!data.postsRelated?.length && (
					<RelatedArticles items={data.postsRelated} />
				)}
			</Container>
		)
	)
}

export default page
