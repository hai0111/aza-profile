import { PropsWithChild } from '@/app/types'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
	title: "Aza's diary",
}

const layout: FC<PropsWithChild> = ({ children }) => {
	return <div>{children}</div>
}

export default layout
