'use client'
import { FC, useEffect, useRef } from 'react'

interface Props {
	texts: string[]
}

const TypingAnimation: FC<Props> = ({ texts }) => {
	const textContainer = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const { current: container } = textContainer
		if (!container) return
		let skip = 30
		let index = 0
		let offset = 0
		let type: '+' | '-' = '+'

		const renderText = () => {
			container.textContent = texts[index].slice(0, offset)
		}

		const intervalId = setInterval(() => {
			let text = texts[index]
			if (offset < text.length && type === '+') {
				offset++
			} else if (skip) {
				type = '-'
				skip--
			} else if (offset > 0 && type === '-') {
				offset--
			} else {
				type = '+'
				skip = 30
				offset = 0
				index = index === texts.length - 1 ? 0 : index + 1
			}

			renderText()
		}, 80)
		return () => {
			clearInterval(intervalId)
		}
	}, [textContainer])

	return (
		<div>
			<span ref={textContainer}></span>
			<span className="animate-blink ms-1">_</span>
		</div>
	)
}

export default TypingAnimation
