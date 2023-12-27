import Footer from '@/components/Footer'
import Navbar from '@/components/navbar'
import ThemeProvider from '@/utils/theme'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Aza - Home',
	description: "Aza's web app",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark">
			<body className="bg-light dark:bg-dark text-light dark:text-dark min-h-screen relative pt-20 flex flex-col">
				<ThemeProvider>
					<Navbar />
					<main className="grow">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
