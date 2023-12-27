'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
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

interface INavLink {
	text: string
	link: string
	icon?: ReactNode
}

const navLinks: INavLink[] = [
	// {
	// 	link: '/diary',
	// 	text: 'Diary',
	// },
	{
		link: 'https://github.com/hai0111?tab=repositories',
		text: 'Sources',
		icon: <IoLogoGithub />,
	},
]

const NavbarHeader = () => {
	return (
		<header className="flex justify-center backdrop-blur-md bg-white bg-opacity-25 dark:bg-transparent fixed top-0 left-0 right-0 z-10">
			<main className="flex items-center w-full max-w-[768px] p-2">
				<Logo />
				<div className="ml-5 hidden sm:inline-flex">
					{navLinks.map((item) => (
						<Link
							href={item.link}
							key={item.link}
							className="p-2 inline-flex items-center gap-1 hover:underline underline-offset-2"
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
								key={item.link}
								href={item.link}
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
