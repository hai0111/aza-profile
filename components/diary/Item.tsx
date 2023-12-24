'use client'

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Textarea,
} from '@nextui-org/react'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'
import { PiStarFill, PiStarThin } from 'react-icons/pi'
import { TbDots } from 'react-icons/tb'
import { IoMdClose } from 'react-icons/io'
import { IoCheckmark } from 'react-icons/io5'
import useDate from '@/utils/useDate'

export interface IDataDiary {
	id: number
	time: string
	star: boolean
	content: string
}

interface Props {
	editable: boolean
	data: IDataDiary
	setActive(idActive: null | number): void
	saveData(data: IDataDiary): void
	openDelete(id: number): void
}

const DiaryItem: FC<Props> = ({
	data,
	setActive,
	editable,
	saveData,
	openDelete,
}) => {
	const [diary, setDiary] = useState<IDataDiary>({
		...data,
	})

	useEffect(() => {
		setDiary({ ...data })
	}, [data])

	const setContent = (content: string) => {
		setDiary({ ...diary, content })
	}

	const onCancel = () => {
		setActive(null)
		setDiary({ ...data })
	}

	const handleSaveData = () => {
		saveData(diary)
		setActive(null)
	}

	const toggleImportance = () => {
		const data = { ...diary }
		data.star = !data.star
		saveData(data)
	}

	// Date controller

	const { date, setDate, DatePicker } = useDate()
	return (
		<div className="group bg-white bg-opacity-10 flex items-center py-2 px-4 rounded-2xl relative">
			<div className="flex-1">
				<div className="text-xs flex items-center">
					<span className="me-1">{diary.time}</span>
					{editable && <DatePicker />}
				</div>
				{editable ? (
					<div className="pe-3">
						<Textarea
							className="mt-1"
							variant="flat"
							value={diary.content}
							onValueChange={setContent}
						/>
						<div className="flex justify-end mt-1">
							<Button
								isIconOnly
								size="sm"
								className="text-medium"
								color="danger"
								onClick={onCancel}
							>
								<IoMdClose />
							</Button>
							<Button
								isIconOnly
								size="sm"
								className="text-medium text-white ms-2"
								color="success"
								onClick={handleSaveData}
							>
								<IoCheckmark />
							</Button>
						</div>
					</div>
				) : (
					<div className="mt-1 pe-5">{diary.content}</div>
				)}
			</div>
			<div
				className="text-yellow-500 text-xl me-6 md:me-0 cursor-pointer"
				onClick={toggleImportance}
			>
				{diary.star ? <PiStarFill /> : <PiStarThin />}
			</div>

			<Dropdown className="min-w-[100px] -translate-y-2" size="sm">
				<DropdownTrigger>
					<Button
						isIconOnly
						disableRipple
						className="bg-transparent text-xl min-w-0 px-0 ms-2 md:hidden absolute top-1 right-1 z-0"
						size="sm"
						variant="solid"
					>
						<TbDots />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Diary options">
					<DropdownItem textValue="Sửa" onClick={() => setActive(data.id)}>
						<span className="inline-flex items-center gap-2">
							<MdEdit />
							Sửa
						</span>
					</DropdownItem>
					<DropdownItem textValue="Xóa" onClick={() => openDelete(data.id)}>
						<span className="inline-flex items-center gap-2">
							<FaTrash />
							Xóa
						</span>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<div className="hidden md:flex flex-col justify-center gap-2 absolute top-0 bottom-0 px-3 left-full overflow-hidden">
				<Button
					isIconOnly
					size="sm"
					className="-translate-x-12 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 rounded-full text-[0.9rem]"
					color="primary"
					onClick={() => setActive(data.id)}
				>
					<MdEdit />
				</Button>
				<Button
					isIconOnly
					size="sm"
					className="-translate-x-12 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 delay-75 rounded-full text-[0.7rem]"
					color="danger"
					onClick={() => openDelete(data.id)}
				>
					<FaTrash />
				</Button>
			</div>
		</div>
	)
}

export default memo(DiaryItem)
