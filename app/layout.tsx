import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import ThemeProvider from '@/utils/theme'
import type { Metadata } from 'next'
import './globals.css'
import Animation3D from '@/components/Animation3D'
import dbConnect from '@/lib/dbConnect'

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
					<Navbar />
					<Animation3D />
					<main className="grow relative z-10">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
