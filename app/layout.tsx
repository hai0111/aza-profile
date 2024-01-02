import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import dbConnect from '@/lib/dbConnect'
import ThemeProvider from '@/utils/theme'
import 'animate.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import 'react-datepicker/dist/react-datepicker.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import SessionProvider from '@/utils/session'

export const metadata: Metadata = {
	title: 'Aza - Home',
	description: "Aza's web app",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Connect DB immediately
	dbConnect()

	const session = await getServerSession()

	return (
		<html lang="en" className="dark">
			<body className="bg-light dark:bg-dark text-light dark:text-dark min-h-screen relative pt-20 flex flex-col">
				<ThemeProvider>
					<SessionProvider session={session}>
						<ToastContainer
							hideProgressBar
							theme="light"
							className={'leading-none text-sm'}
							toastClassName="p-0"
							toastStyle={{ minHeight: 0 }}
						/>
						<Navbar />
						<main className="grow relative z-10">{children}</main>
						<Footer />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
