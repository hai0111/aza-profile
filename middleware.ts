import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// retrieve the current response
	const res = NextResponse.next()

	// add the CORS headers to the response
	res.headers.append('Access-Control-Allow-Credentials', 'true')
	res.headers.append(
		'Access-Control-Allow-Origin',
		'https://aza-dev-0111.netlify.app/'
	) // replace this your actual origin
	res.headers.append(
		'Access-Control-Allow-Methods',
		'GET,DELETE,PATCH,POST,PUT'
	)
	res.headers.append(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)

	return res
}
// See "Matching Paths" below to learn more
export const config = {
	matcher: '/api/:path*',
}
