'use client'

import Container from '@/components/Container'
import Add from '@/components/diary/Add'
import Filter from '@/components/diary/Filter'
import DairyItem, { IDataDiary } from '@/components/diary/Item'
import myAxios from '@/services/apiClient'
import { apiHandler, useLoad } from '@/services/apiHandler'
import { findAndReplace } from '@/utils'
import ClientOnly from '@/utils/ClientOnly'
import InfinitieScroll from '@/utils/InfinitieScroll'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import moment from 'moment'
import {
	createRef,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import ReactDatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Diary = () => {
	const [activeEditable, setActiveEditable] = useState<number | null>(null)

	const pageInfo = useRef({
		index: 0,
		size: 10,
	})

	const allowLoadmore = useRef<boolean>(true)

	const refScroll = useRef({ scrollToTop() {} })

	const [list, setList] = useState<IDataDiary[]>([])

	const listRender = useMemo(() => {
		return list.map((data) => ({ data, refNode: createRef<HTMLDivElement>() }))
	}, [list])

	const { loading, handler: getData } = useLoad(async () => {
		pageInfo.current.index += 1
		const res = await myAxios.get('/api/diary', {
			params: { ...pageInfo.current, ...dataSearch },
		})
		setList((arr) => [...arr, ...res.data.items])
		const { size, index, totalRecords } = res.data.page
		allowLoadmore.current =
			(index - 1) * size + res.data.items.length < totalRecords
	})

	const setActive = useCallback((id: number | null) => {
		setActiveEditable(id)
	}, [])

	const saveData = useCallback((data: IDataDiary) => {
		apiHandler(async () => {
			setLoadingList((arr) => arr.concat([data._id]))
			const res = await myAxios.put(`/api/diary/${data._id}`, data)
			setLoadingList((arr) => arr.filter((id) => id !== data._id))
			setList((arr) => {
				findAndReplace(arr, res.data, (item) => item._id === data._id)
				return arr
			})
			toast('Edited successfully', {
				type: 'success',
			})
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
			setLoadingList((arr) => arr.concat([idDelete.current!]))
			await myAxios.delete(`/api/diary/${idDelete.current}`)
			setList((arr) => arr.filter(({ _id }) => _id !== idDelete.current))
			setLoadingList((arr) => arr.filter((id) => id !== idDelete.current))
			toast('Deleted successfully', {
				type: 'success',
			})
		})
	}

	// loading item controller
	const [loadingList, setLoadingList] = useState<number[]>([])

	// Data search controller
	const [dataSearch, setDataSearch] = useState<{
		fromDate: null | string
		toDate: null | string
	}>({
		fromDate: null,
		toDate: null,
	})

	useEffect(() => {
		if (!loading) {
			pageInfo.current.index = 0
			allowLoadmore.current = true
			setList([])
			getData()
			refScroll.current.scrollToTop()
		}
	}, [dataSearch.fromDate, dataSearch.toDate])

	return (
		<Container>
			<div className="flex justify-end gap-3 pb-5 pt-20 items-center">
				<Filter setDataSearch={setDataSearch} />

				<Add
					setList={(fn) => {
						setList(fn)
						refScroll.current.scrollToTop()
					}}
				/>
			</div>

			<ClientOnly>
				<InfinitieScroll
					allowScorll={allowLoadmore.current}
					className="max-h-[600px]"
					loadMore={getData}
					ref={refScroll}
				>
					<TransitionGroup className="flex flex-col gap-5">
						{listRender.map(({ data, refNode }) => (
							<CSSTransition
								key={data._id}
								classNames={{
									exitActive: 'animate__animated animate__flipOutX',
								}}
								timeout={600}
								nodeRef={refNode}
							>
								<div ref={refNode}>
									<DairyItem
										loading={loadingList.includes(data._id)}
										editable={data._id === activeEditable}
										data={data}
										setActive={setActive}
										saveData={saveData}
										openDelete={onOpenDelete}
									/>
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
				</InfinitieScroll>
			</ClientOnly>
			<Modal isOpen={isOpenDelete} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader />
					<ModalBody>Are you sure you want to delete this element?</ModalBody>
					<ModalFooter>
						<Button className="bg-transparent" onClick={onClose}>
							Cancel
						</Button>
						<Button onClick={handleDelete} color="danger">
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Container>
	)
}

export default Diary
