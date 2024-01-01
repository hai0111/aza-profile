'use client'

import { blockFuture, ifIsString } from '@/utils'
import {
	Button,
	CircularProgress,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Textarea,
} from '@nextui-org/react'
import moment from 'moment'
import { FC, memo, useRef } from 'react'
import { FaTrash } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { IoCheckmark } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { PiStarFill, PiStarThin } from 'react-icons/pi'
import { TbDots } from 'react-icons/tb'
import { CSSTransition } from 'react-transition-group'
import DatePicker from '../DatePicker'
import diaryFormik from './diaryFormik'

export interface IDataDiary {
	_id: number
	day: Date
	interest: boolean
	content: string
}

interface Props {
	editable: boolean
	loading: boolean
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
	loading,
}) => {
	const onCancel = () => {
		setActive(null)
		formik.resetForm()
	}

	const handleSaveData = (values: IDataDiary) => {
		saveData(values)
		setActive(null)
	}

	const formik = diaryFormik(handleSaveData, {
		...data,
	})

	const toggleImportance = () => {
		formik.setFieldValue('interest', !formik.values.interest)
		if (!editable) formik.submitForm()
	}

	// Date controller
	const refLoad = useRef(null)

	return (
		<div className="group bg-white bg-opacity-40 dark:bg-opacity-10 flex items-center py-2 px-4 rounded-2xl relative">
			<div className="flex-1">
				<div className="text-xs flex items-center">
					<span className="me-1">
						{editable ? (
							<div className="flex items-center">
								<DatePicker
									selected={formik.values.day || undefined}
									onChange={(date) => formik.setFieldValue('day', date)}
									dateFormat={'dd/MM/yyyy HH:mm'}
									showTimeInput
									filterDate={blockFuture}
								/>
								<span className="text-danger-400 text-xs">
									{ifIsString(formik.errors.day)}
								</span>
							</div>
						) : (
							moment(data.day).format('DD/MM/YYYY HH:mm')
						)}
					</span>
					<CSSTransition
						in={loading}
						unmountOnExit
						classNames={{
							exitActive: 'animate__animated animate__zoomOut',
						}}
						timeout={500}
						nodeRef={refLoad}
					>
						<CircularProgress
							ref={refLoad}
							size="sm"
							aria-label="Loading..."
							className="me-3"
							classNames={{
								svg: 'w-4 h-4',
							}}
						/>
					</CSSTransition>
				</div>
				{editable ? (
					<div className="pe-3">
						<Textarea
							name="content"
							className="mt-1"
							variant="flat"
							value={formik.values.content}
							onChange={formik.handleChange}
							errorMessage={formik.errors.content}
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
								onClick={formik.submitForm}
							>
								<IoCheckmark />
							</Button>
						</div>
					</div>
				) : (
					<div className="mt-1 pe-5 text-start whitespace-pre-wrap">
						{formik.values.content}
					</div>
				)}
			</div>
			<div
				className="text-yellow-500 text-xl me-6 cursor-pointer"
				onClick={toggleImportance}
			>
				{formik.values.interest ? <PiStarFill /> : <PiStarThin />}
			</div>

			<Dropdown className="min-w-[100px] -translate-y-2" size="sm">
				<DropdownTrigger>
					<Button
						isIconOnly
						disableRipple
						className="bg-transparent text-xl min-w-0 px-0 ms-2 absolute top-1 right-1 z-0"
						size="sm"
						variant="solid"
					>
						<TbDots />
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Diary options">
					<DropdownItem textValue="Sửa" onClick={() => setActive(data._id)}>
						<span className="inline-flex items-center gap-2">
							<MdEdit />
							Sửa
						</span>
					</DropdownItem>
					<DropdownItem textValue="Xóa" onClick={() => openDelete(data._id)}>
						<span className="inline-flex items-center gap-2">
							<FaTrash />
							Xóa
						</span>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	)
}

export default memo(DiaryItem)
