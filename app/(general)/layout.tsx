import Animation3D from '@/components/Animation3D'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="pt-20">
			<Animation3D />
			{children}
		</div>
	)
}

export default layout
