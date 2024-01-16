import { FC } from 'react'
import { PropsWithChild } from '../types'

const layout: FC<PropsWithChild> = ({ children }) => {
	return <div>{children}</div>
}

export default layout
 