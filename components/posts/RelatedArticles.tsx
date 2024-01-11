import React from 'react'
import PostItem from './Item'
import { IPostResponse } from '@/models/Post'

const data: IPostResponse[] = []

const RelatedArticles = () => {
	return (
		<div className="mt-20 pt-1 border-t-2 border-orange-500 font-bold relative">
			<div className="absolute w-[4rem] h-[2rem] bg-orange-500 top-0 left-0 rounded-br-full"></div>
			<span className="ms-[4.5rem]">Related Articles</span>

			<div className="pt-3 grid grid-cols-2 gap-3">
				{data.map((item) => (
					<PostItem key={item._id} data={item} />
				))}
			</div>
		</div>
	)
}

export default RelatedArticles
