import Container from '@/components/Container'
import CustomEditor from '@/components/CustomEditor'
import Banner from '@/components/posts/Banner'
import ClientOnly from '@/utils/ClientOnly'
import { Input } from '@nextui-org/react'

const page = () => {
	return (
		<div>
			<Banner />
			<Container className="pt-4">
				<Input placeholder="Title" size="sm" />
				<div className="mt-4">
					<ClientOnly>
						<CustomEditor />
					</ClientOnly>
				</div>
			</Container>
		</div>
	)
}

export default page
