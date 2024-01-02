import clsx from 'clsx'
import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
	className?: string
}

const Container: FC<Props> = ({ children, className }) => {
	return (
		<main
			className={clsx(
				'w-full max-w-[62ch] mx-auto text-justify pb-5 px-5',
				className
			)}
		>
			{children}
		</main>
	)
}

export default Container
