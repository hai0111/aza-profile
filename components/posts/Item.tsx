import { IPostResponse } from '@/models/Post'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
	data: IPostResponse
}

const PostItem: FC<Props> = ({ data }) => {
	return (
		<Link href={`/posts/${data._id}`}>
			<Image
				src={data.thumbnail}
				alt=""
				width={300}
				height={300}
				className="rounded"
			/>
			<div className="text-center pt-1">{data.title}</div>
		</Link>
	)
}

export default PostItem
