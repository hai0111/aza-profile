import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Aza - Diary',
	description: "Aza's web app",
}

import React, { FC, ReactNode } from 'react'

const DiaryLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return <div>{children}</div>
}

export default DiaryLayout
