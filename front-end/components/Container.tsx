import React, { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const Container: FC<Props> = ({ children }) => {
	return (
		<main className="w-full max-w-[62ch] mx-auto text-justify pb-5 px-5">
			{children}
		</main>
	)
}

export default Container
