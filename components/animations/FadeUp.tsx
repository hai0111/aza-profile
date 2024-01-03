import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
	delay?: number
	duration?: number
	onAnimationStart?(): void
}

const FadeUp: FC<Props> = ({
	children,
	delay = 0,
	duration = 0.25,
	onAnimationStart,
}) => (
	<motion.div
		initial={{ y: 20, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: 20, opacity: 0 }}
		onAnimationStart={onAnimationStart}
		transition={{ duration, delay }}
	>
		{children}
	</motion.div>
)

export default FadeUp
