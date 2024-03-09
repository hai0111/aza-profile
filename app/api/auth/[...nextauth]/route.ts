import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import AdminModel from '@/models/Admin'
import { compare } from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials, req) {
				await dbConnect()
				const user = await AdminModel.findOne({
					username: credentials?.username,
				})

				const checkPassword = await compare(
					credentials?.password || '',
					user?.password
				)

				if (user && checkPassword) {
					return {
						id: user._id,
						name: user.username,
					}
				}
				return null
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		maxAge: 24 * 60 * 60 * 30,
	},
})

export { handler as GET, handler as POST }
