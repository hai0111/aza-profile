'use client'

import Animation3D from '@/components/Animation3D'
import Container from '@/components/Container'
import Add from '@/components/diary/Add'
import DairyItem, { IDataDiary } from '@/components/diary/Item'
import myAxios from '@/services/apiClient'
import apiHandler from '@/services/apiHandler'
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
			const res = await myAxios.get('/api/diary')
			setList(res.data)
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
		apiHandler(async () => {
			await myAxios.put(`/api/diary/${data._id}`, data)
			getData()
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

	const handleDelete = async () => {
		onClose()
		apiHandler(async () => {
			await myAxios.delete(`/api/diary/${idDelete.current}`)
			getData()
		})
	}

	// Handle Add

	return (
		<Container>
			<div className="flex justify-center pb-5 pt-20">
				<Add getData={getData} />
			</div>

			<div className="flex flex-col gap-5">
				<ClientOnly>
					{list.map((item) => (
						<DairyItem
							key={item._id}
							editable={item._id === activeEditable}
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
