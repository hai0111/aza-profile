import Link from 'next/link'
import { IconType } from 'react-icons'
import { FaFacebookSquare, FaGithub } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

interface FooterItem {
	link: string
	icon: IconType
}

const footerItems: FooterItem[] = [
	{
		link: 'https://github.com/hai0111?tab=repositories',
		icon: FaGithub,
	},
	{
		link: 'https://www.facebook.com/100038175740881',
		icon: FaFacebookSquare,
	},
	{
		link: 'https://www.instagram.com/nv.hai111/',
		icon: RiInstagramFill,
	},
]

const Footer = () => {
	return (
		<footer className="text-center text-sm pb-5 pt-20 opacity-50">
			Akaza's Website
			<div className="flex justify-center gap-2 mt-2">
				-------------
				{footerItems.map((item) => {
					const Icon = item.icon
					return (
						<Link
							key={'footer:' + item.link}
							href={item.link}
							className="text-xl"
						>
							<Icon />
						</Link>
					)
				})}
				-------------
			</div>
		</footer>
	)
}

export default Footer
