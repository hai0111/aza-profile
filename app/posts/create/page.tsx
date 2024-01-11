import Banner from '@/components/posts/Banner'
import CreatePostForm from '@/components/posts/CreateForm'
import ClientOnly from '@/utils/ClientOnly'
import React from 'react'

const page = () => {
	return (
		<div>
			<Banner />
			<ClientOnly>
				<CreatePostForm />
			</ClientOnly>
		</div>
	)
}

export default page
