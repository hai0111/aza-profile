'use client'
import { redirect } from 'next/navigation'
import { FC, ReactNode, useContext } from 'react'
import { SessionContext } from './session'

export const checkAuth = (url?: string) => {
	const session = useContext(SessionContext)
	if (!session) redirect(url || '/')
}
const CheckAuthWrapper: FC<{
	children: ReactNode
	fallback?: ReactNode
}> = ({ children, fallback }) => {
	const session = useContext(SessionContext)
	return session ? children : fallback
}

export default CheckAuthWrapper
