import React, { useRef } from 'react'

const useInfiniteScroll = () => {
	const pageInfo = useRef({
		pageIndex: 1,
		pageSize: 10,
	})

	const list = []
	return <div>useInfiniteScroll</div>
}

export default useInfiniteScroll
