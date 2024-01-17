'use client'
import { useLoad } from '@/services/apiHandler'
import clsx from 'clsx'
import {
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
	UIEvent,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react'

interface Props {
	loadMore(): Promise<any>
	className?: string
	children: ReactNode
	loadEl?: ReactNode
	allowScroll: boolean
	loading?: boolean
}

const InfiniteScroll: ForwardRefExoticComponent<Props & RefAttributes<any>> =
	forwardRef(
		(
			{
				loadMore,
				children,
				className,
				allowScroll,
				loadEl = 'Loading...',
				loading: loadingProp,
			},
			ref
		) => {
			const refScrollBox = useRef<HTMLDivElement>(null)
			const { loading, handler: loadMoreHandler } = useLoad(loadMore)
			const lastScroll = useRef(0)
			const handleScroll = (e: UIEvent<HTMLDivElement>) => {
				const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget
				const checkPosition = scrollTop + offsetHeight > scrollHeight - 50
				const isDown = scrollTop > lastScroll.current
				const shouldScroll = allowScroll && checkPosition && isDown && !loading
				if (shouldScroll) loadMoreHandler()
				lastScroll.current = scrollTop
			}

			const scrollToTop = useCallback(() => {
				if (refScrollBox.current) refScrollBox.current.scrollTo({ top: 0 })
			}, [refScrollBox])

			useImperativeHandle(ref, () => ({
				scrollToTop,
			}))

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
					{(loading || loadingProp) && (
						<div className="flex justify-center py-3 animate-expand-y">
							{loadEl}
						</div>
					)}
				</div>
			)
		}
	)

export default InfiniteScroll
