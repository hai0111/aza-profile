import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import ThemeProvider from '@/utils/theme'
import type { Metadata } from 'next'
import Animation3D from '@/components/Animation3D'
import dbConnect from '@/lib/dbConnect'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import 'animate.css'

export const metadata: Metadata = {
	title: 'Aza - Home',
	description: "Aza's web app",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// Connect DB immediately
	dbConnect()
	return (
		<html lang="en" className="dark">
			<body className="bg-light dark:bg-dark text-light dark:text-dark min-h-screen relative pt-20 flex flex-col">
				<ThemeProvider>
					<ToastContainer
						hideProgressBar
						theme="light"
						className={'leading-none text-sm'}
						toastClassName="p-0"
						toastStyle={{ minHeight: 0 }}
					/>
					<Navbar />
					<Animation3D />
					<main className="grow relative z-10">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
