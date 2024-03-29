import { FC } from 'react'
import { PropsWithChild } from '../types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Aza's posts",
}  

const layout: FC<PropsWithChild> = ({ children }) => {
	return <div>{children}</div>
}

export default layout
