import Container from '@/components/Container'
import RelatedArticles from '@/components/posts/RelatedArticles'
import { IPostRespon } from '@/models/Post'
import { Image } from '@nextui-org/react'
import Link from 'next/link'
import { GoChevronRight } from 'react-icons/go'

const page = () => {
	const data: IPostRespon = {
		_id: Math.random().toString(),
		content:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus vitae porro ipsum placeat eos tempora alias eligendi, aperiam deserunt explicabo.',
		slug: 'this is my post',
		thumnail: '/images/blog-financial-goal.png',
		title: 'This is my post',
		createAt: '',
		updateAt: '',
		relateds: [],
	}

	return (
		<Container className="pt-16">
			<Image className="aspect-[9/5] object-cover" src={data.thumnail} alt="" />

			<h2 className="text-2xl pt-6 flex items-center gap-2">
				<Link href={'/posts'} className="text-blue-400">
					Works
				</Link>
				<GoChevronRight /> {data.title}
			</h2>

			<div
				className="pt-10"
				dangerouslySetInnerHTML={{ __html: data.content }}
			></div>
			<RelatedArticles />
		</Container>
	)
}

export default page
