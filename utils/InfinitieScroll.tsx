'use client'
import { useLoad } from '@/services/apiHandler'
import clsx from 'clsx'
import { FC, ReactNode, UIEvent, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
	loadMore(): Promise<any>
	className?: string
	children: ReactNode
	loadEl?: ReactNode
	allowScorll: boolean
}

const InfinitieScroll: FC<Props> = ({
	loadMore,
	children,
	className,
	allowScorll,
	loadEl = 'Loading...',
}) => {
	const refScrollBox = useRef(null)
	const { loading, handler: loadMoreHandler } = useLoad(loadMore)
	const lastScroll = useRef(0)
	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget
		const checkPosition = scrollTop + offsetHeight > scrollHeight - 10
		const isDown = scrollTop > lastScroll.current
		const shouldScorll = allowScorll && checkPosition && isDown && !loading
		if (shouldScorll) loadMoreHandler()
		lastScroll.current = scrollTop
	}

	useEffect(() => {
		loadMoreHandler()
	}, [])

	return (
		<div
			className={clsx(
				'overflow-y-auto overflow-x-hidden flex flex-col custom-scroll pe-3',
				className || 'h-100'
			)}
			ref={refScrollBox}
			onScroll={handleScroll}
		>
			{children}
			{loading && (
				<div className="flex justify-center py-3 animate-expand-y">
					{loadEl}
				</div>
			)}
		</div>
	)
}

export default InfinitieScroll
