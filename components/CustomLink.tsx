import { Button, ButtonProps } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

interface Props extends ButtonProps {
	link: string
	children: ReactNode
}

const CustomLink: FC<Props> = ({ link, children, className, ...props }) => {
	return (
		<Button className={clsx(className, 'pa-0')} {...props}>
			<Link
				className="h-full w-full inline-flex justify-center items-center"
				href={link}
			>
				{children}
			</Link>
		</Button>
	)
}

export default CustomLink
