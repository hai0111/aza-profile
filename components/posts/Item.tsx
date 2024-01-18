import { IPostResponse } from '@/models/Post'
import CheckAuthWrapper from '@/utils/CheckAuth'
import { Button, Image } from '@nextui-org/react'
import Link from 'next/link'
import { FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import CustomLink from '../CustomLink'

interface Props {
	data: IPostResponse
	onActiveDelete?(_id: string): void
}

const PostItem: FC<Props> = ({ data, onActiveDelete }) => {
	return (
		<div className="relative group">
			<Link href={`posts/id/${data._id}`}>
				<Image
					src={data.thumbnail}
					alt=""
					className="rounded aspect-video min-h-[200px] object-cover"
				/>
			</Link>
			<div className="text-center pt-1">{data.title}</div>

			<CheckAuthWrapper>
				<div className="flex items-center absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100">
					<CustomLink
						link={`/posts/update/${data._id}`}
						isIconOnly
						disableRipple
						className="text-[1.23rem] min-w-0 px-0 ms-2"
						size="sm"
						variant="solid"
					>
						<MdEdit />
					</CustomLink>

					<Button
						isIconOnly
						disableRipple
						className="text-sm min-w-0 px-0 ms-2"
						size="sm"
						variant="solid"
						onClick={() => {
							onActiveDelete && onActiveDelete(data._id)
						}}
					>
						<FaTrash />
					</Button>
				</div>
			</CheckAuthWrapper>
		</div>
	)
}

export default PostItem
