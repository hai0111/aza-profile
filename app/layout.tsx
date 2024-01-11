import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import SessionProvider from '@/utils/session'
import ThemeProvider from '@/utils/theme'
import 'animate.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { PrimeReactProvider } from 'primereact/api'
import 'react-datepicker/dist/react-datepicker.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

export const metadata: Metadata = {
	title: 'Aza - Home',
	description: "Aza's web app",
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const cookieStore = cookies()
	const theme = cookieStore.get('theme')?.value || 'dark'

	return (
		<html lang="en" className="dark">
			<body className="bg-light dark:bg-dark text-light dark:text-dark min-h-screen relative flex flex-col">
				<ThemeProvider initialValue={theme}>
					<PrimeReactProvider>
						<SessionProvider session={await getServerSession()}>
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
					</PrimeReactProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
