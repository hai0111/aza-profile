import React from 'react'
import Foot from '../icons/Foot'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href={'/'} className="inline-flex items-center p-2 group/logo">
			<Foot className="group-hover/logo:rotate-12" />
			<h1 className="font-bold text-[18px] tracking-tighter">Nguyen Van Hai</h1>
		</Link>
	)
}

export default Logo
