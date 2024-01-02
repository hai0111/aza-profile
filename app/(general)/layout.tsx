import Animation3D from '@/components/Animation3D'
import React, { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<main>
			<Animation3D />
			{children}
		</main>
	)
}

export default layout
