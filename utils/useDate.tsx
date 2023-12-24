'use client'

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react'
import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { FcCalendar } from 'react-icons/fc'

const useDate = () => {
	const [date, setDate] = useState<Date>()
	return {
		date,
		setDate,
		DatePicker: ({
			children = (
				<Button
					isIconOnly
					className="p-0 min-h-0 min-w-0 h-min w-min outline-none"
				>
					<FcCalendar />
				</Button>
			),
		}) => (
			<Dropdown>
				<DropdownTrigger>{children}</DropdownTrigger>
				<DropdownMenu aria-label="date picker" variant="solid">
					<DropdownItem
						variant="bordered"
						className="border-0"
						textValue="calendar"
					>
						<DayPicker mode="single" selected={date} onSelect={setDate} />
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		),
	}
}

export default useDate
