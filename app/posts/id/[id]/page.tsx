'use client'
import Container from '@/components/Container'
import RelatedArticles from '@/components/posts/RelatedArticles'
import { IPostResponse } from '@/models/Post'
import myAxios from '@/services/apiClient'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'

import '@/styles/ck-editor.scss'
import '@/components/CustomEditor/CustomEditor.css'

const page = ({ params }: { params: { id: string } }) => {
	const [data, setData] = useState<IPostResponse | null>(null)
	useEffect(() => {
		myAxios.get(`/posts/${params.id}`).then(({ data }) => {
			setData(data)
		})
	}, [])

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
				<RelatedArticles items={data.postsRelated} />
			</Container>
		)
	)
}

export default page
