import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import AdminModel from '@/models/Admin'
import { compare } from 'bcryptjs'

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials, req) {
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
})

export { handler as GET, handler as POST }
