'use client'

import Container from '@/components/Container'
import Add from '@/components/diary/Add'
import DairyItem, { IDataDiary } from '@/components/diary/Item'
import myAxios from '@/services/apiClient'
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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'react-swipeable-list/dist/styles.css'

const Diary = () => {
	const [activeEditable, setActiveEditable] = useState<number | null>(null)
	const [list, setList] = useState<IDataDiary[]>([])

	const getData = async () => {
		try {
			if (!list.length) {
				const res = await myAxios.get('/api/diary')
				setList(res.data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getData()
	}, [])

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

	// Handle Add

	return (
		<Container>
			<div className="flex justify-center">
				<Add />
			</div>

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
