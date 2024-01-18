'use client'

import Link from 'next/link'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { IoLogoGithub, IoMenu } from 'react-icons/io5'
import Logo from './Logo'
import ThemeToggleButton from './ToggleTheme'

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react'
import { SessionContext } from '@/utils/session'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ThemeContext } from '@/utils/theme'

interface INavLink {
	text: string
	link: string
	icon?: ReactNode
}

const navLinks: INavLink[] = [
	{
		link: '/posts',
		text: 'Posts',
	},
	{
		link: 'https://github.com/hai0111?tab=repositories',
		text: 'Sources',
		icon: <IoLogoGithub />,
	},
]

const NavbarHeader = () => {
	const session = useContext(SessionContext)
	const [navList, setNavList] = useState<INavLink[]>(navLinks)
	useEffect(() => {
		if (!!session)
			setNavList(
				[
					{
						link: '/diary',
						text: 'Diary',
					},
				].concat(navLinks)
			)
	}, [])

	const pathName = usePathname()

	const { theme } = useContext(ThemeContext)

	const checkNavActive = (link: string) =>
		pathName.match(/\/\w+/)?.[0] === link.match(/\/\w+/)?.[0]

	return (
		<header className="flex justify-center backdrop-blur-md bg-white bg-opacity-25 dark:bg-transparent fixed top-0 left-0 right-0 z-20">
			<main className="flex items-center w-full max-w-[768px] p-2">
				<Logo />
				<div className="ms-5 hidden sm:inline-flex ">
					{navList.map((item) => (
						<Link
							href={item.link}
							className={clsx(
								'py-2 px-4 inline-flex items-center gap-1 hover:underline underline-offset-2 rounded transition-all duration-250 text-center',
								{
									'animate-blink-text font-bold tracking-wider text-white':
										checkNavActive(item.link) && theme !== 'light',
									'bg-primary text-white transition':
										checkNavActive(item.link) && theme === 'light',
									'hover:no-underline': checkNavActive(item.link),
								}
							)}
							key={item.link + 'pc'}
						>
							{item.icon}
							{item.text}
						</Link>
					))}
				</div>

				<div className="flex-1" />

				<ThemeToggleButton />

				<Dropdown backdrop="blur">
					<DropdownTrigger>
						<Button
							className="w-[40px] text-xl min-w-0 px-0 ms-2 sm:hidden"
							variant="bordered"
						>
							<IoMenu />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label="Dynamic Actions">
						{navLinks.map((item) => (
							<DropdownItem
								textValue={item.text}
								href={item.link}
								key={item.link + 'mb'}
							>
								<span className="inline-flex items-center gap-1">
									{item.icon}
									{item.text}
								</span>
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</main>
		</header>
	)
}

export default NavbarHeader
