'use server'

import { redirect } from 'next/navigation'

const useRedirect = (url: string) => {
	redirect(url)
}

export default useRedirect
