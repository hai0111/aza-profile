'use client'

import Container from '@/components/Container'
import DairyItem, { IDataDiary } from '@/components/diary/Item'
import { ClientOnly } from '@/utils'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import React, { useCallback, useRef, useState } from 'react'
import 'react-swipeable-list/dist/styles.css'

const initList: IDataDiary[] = [
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content:
			'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis ut molestias dolores ducimus libero sequi cumque veritatis sint reiciendis neque.',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
	{
		id: Math.random(),
		time: '19/12/2023 17:03',
		star: Math.random() > 0.5,
		content: 'Không hiểu sao, kẹo sữa mikita lại được làm từ sữa',
	},
]

const Diary = () => {
	const [activeEditable, setActiveEditable] = useState<number | null>(null)
	const [list, setList] = useState<IDataDiary[]>(initList)

	const setActive = useCallback((id: number | null) => {
		setActiveEditable(id)
	}, [])

	const saveData = useCallback((data: IDataDiary) => {
		setList((list) => {
			const idx = list.findIndex((item) => item.id === data.id)
			list[idx] = { ...data }
			return [...list]
		})
	}, [])

	/* Delete ==================== */
	const idDelete = useRef<number>()
	const {
		isOpen: isOpenDelete,
		onOpen,
		onOpenChange,
		onClose,
	} = useDisclosure()

	const onOpenDelete = useCallback((id: number) => {
		idDelete.current = id
		onOpen()
	}, [])

	const handleDelete = () => {
		setList((list) => {
			return list.filter(({ id }) => id !== idDelete.current)
		})
		onClose()
	}

	return (
		<Container>
			<div className="flex flex-col gap-5">
				<ClientOnly>
					{list.map((item) => (
						<DairyItem
							key={item.id}
							editable={item.id === activeEditable}
							data={item}
							setActive={setActive}
							saveData={saveData}
							openDelete={onOpenDelete}
						/>
					))}
				</ClientOnly>
			</div>

			<Modal isOpen={isOpenDelete} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader />
					<ModalBody>Bạn chắc chắn muốn xóa phần tử này?</ModalBody>
					<ModalFooter>
						<Button
							variant="flat"
							className="bg-transparent"
							onClick={handleDelete}
						>
							Xác nhận
						</Button>
						<Button variant="flat" className="bg-transparent" onClick={onClose}>
							Hủy
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Container>
	)
}

export default Diary
