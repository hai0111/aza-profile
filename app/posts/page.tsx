import Container from '@/components/Container'
import Banner from '@/components/posts/Banner'
import PostItem from '@/components/posts/Item'
import { IPostRespon } from '@/models/Post'

const data: IPostRespon[] = []

const page = () => {
	return (
		<>
			<Banner />

			<Container className="pt-10 grid grid-cols-2 gap-3">
				{data.map((item) => (
					<PostItem key={item._id} data={item} />
				))}
			</Container>
		</>
	)
}

export default page
