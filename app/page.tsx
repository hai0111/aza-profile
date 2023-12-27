'use client'

import Animation3D from '@/components/Animation3D'
import Container from '@/components/Container'
import FadeUp from '@/components/animations/FadeUp'
import Bio from '@/components/home/Bio'
import Contact from '@/components/home/Contact'
import Greeting from '@/components/home/Greeting'
import Hobbies from '@/components/home/Hobbies'
import Overview from '@/components/home/Overview'
import Website from '@/components/home/Website'
import Work from '@/components/home/Work'

export default function Home() {
	return (
		<Container className="relative z-10">
			<FadeUp onAnimationStart={() => window.scrollTo({ top: 0 })}>
				<Greeting />
			</FadeUp>

			<FadeUp duration={0.5} delay={0.2}>
				<Overview />
				<Work />
				<Bio />
				<Hobbies />
			</FadeUp>
			<Website />
			<Contact />
		</Container>
	)
}
