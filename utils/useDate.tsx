'use client'

/* 
	Giá chị khởi đầu chỉ set khi mới mount
	Mọi thao tác sau đó đều phải ăn theo dateTime
*/

import {
	Button,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@nextui-org/react'
import moment from 'moment'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { CiClock2 } from 'react-icons/ci'
import { FcCalendar } from 'react-icons/fc'
import styles from './util.module.css'

export const checkTime = (time: string) => {
	time = time || ''
	const hour = Number(time.split(':')[0] === '' ? NaN : time.split(':')[0])
	const minute = Number(time.split(':')[1] === '' ? NaN : time.split(':')[1])
	if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) return true
	else return false
}

const formatDateTime = 'DD/MM/YYYY HH:mm'

const useDate = (value: string = moment().format(formatDateTime)) => {
	const [dateTime, setDateTime] = useState<string>(value)
	const [open, setOpen] = useState(false)
	return {
		dateTime,
		setDateTime,

		DatePicker: ({
			children = (
				<Button
					isIconOnly
					className="p-0 min-h-0 min-w-0 h-min w-min outline-none z-0"
				>
					<FcCalendar />
				</Button>
			),
			onValueChange,
		}: {
			children?: ReactNode
			onValueChange?(value: string): void
		}) => (
			<Popover isOpen={open} onOpenChange={setOpen} placement="bottom">
				<PopoverTrigger>{children}</PopoverTrigger>
				<PopoverContent>
					{() => {
						const [date, setDate] = useState<Date | undefined>(
							moment(dateTime, formatDateTime).toDate()
						)

						const [time, setTime] = useState<string>(
							moment(dateTime, formatDateTime).format('HH:mm')
						)

						const errorMessage = useMemo(() => {
							if (!checkTime(time)) return 'Invalid time'
						}, [time])

						useEffect(() => {
							if (open) {
								setDate(moment(dateTime, formatDateTime).toDate())
								setTime(moment(dateTime, formatDateTime).format('HH:mm'))
							}
						}, [dateTime])

						const handleSetDateTime = () => {
							if (errorMessage) return
							const value = moment(date)
								.set({
									hours: Number(time.split(':')[0]),
									minutes: Number(time.split(':')[1]),
								})
								.format('DD/MM/YYYY HH:mm')
							setDateTime(value)
							setOpen(false)
							if (onValueChange) onValueChange(value)
						}

						return (
							<>
								<DayPicker
									mode="single"
									selected={date}
									onSelect={setDate}
									className={styles['custom-rdp']}
								/>
								<div className="py-1 px-3 flex">
									<Input
										value={time}
										onValueChange={setTime}
										className={styles['custom-input']}
										endContent={<CiClock2 />}
										errorMessage={errorMessage}
									/>
									<Button
										className="ms-2 text-white"
										color="success"
										onClick={handleSetDateTime}
									>
										Chọn
									</Button>
								</div>
							</>
						)
					}}
				</PopoverContent>
			</Popover>
		),
	}
}

export default useDate
