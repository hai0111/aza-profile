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
	useImperativeHandle,
	useRef,
} from 'react'

interface Props {
	loadMore(): Promise<any>
	className?: string
	children: ReactNode
	loadEl?: ReactNode
	allowScorll: boolean
}

const InfinitieScroll: ForwardRefExoticComponent<Props & RefAttributes<any>> =
	forwardRef(
		(
			{ loadMore, children, className, allowScorll, loadEl = 'Loading...' },
			ref
		) => {
			const refScrollBox = useRef<HTMLDivElement>(null)
			const { loading, handler: loadMoreHandler } = useLoad(loadMore)
			const lastScroll = useRef(0)
			const handleScroll = (e: UIEvent<HTMLDivElement>) => {
				const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget
				const checkPosition = scrollTop + offsetHeight > scrollHeight - 50
				const isDown = scrollTop > lastScroll.current
				const shouldScorll = allowScorll && checkPosition && isDown && !loading
				if (shouldScorll) loadMoreHandler()
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
					{loading && (
						<div className="flex justify-center py-3 animate-expand-y">
							{loadEl}
						</div>
					)}
				</div>
			)
		}
	)

export default InfinitieScroll
