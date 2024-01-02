'use client'

import { Session } from 'next-auth'
import { FC, ReactNode, createContext } from 'react'

export const SessionContext = createContext<Session | null>(null)

const SessionProvider: FC<{ children: ReactNode; session: Session | null }> = ({
	children,
	session,
}) => {
	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionProvider
