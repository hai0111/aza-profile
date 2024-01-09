'use client'

import Container from '@/components/Container'
import Add from '@/components/diary/Add'
import Filter from '@/components/diary/Filter'
import DairyItem, { IDataDiary } from '@/components/diary/Item'
import myAxios from '@/services/apiClient'
import { apiHandler, useLoad } from '@/services/apiHandler'
import { findAndReplace } from '@/utils'
import { checkAuth } from '@/utils/CheckAuth'
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
import { toast } from 'react-toastify'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Diary = () => {
	// Check auth and navigate if failed
	checkAuth()

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

	const { loading, handler: getData } = useLoad(async (init = list) => {
		pageInfo.current.index += 1
		const res = await myAxios.get('/diary', {
			params: { ...pageInfo.current, ...dataSearch },
		})
		res.data.items.forEach(
			(item: IDataDiary) => (item.day = moment(item.day).toDate())
		)

		setList([...init, ...res.data.items])
		const { size, index, totalRecords } = res.data.page
		allowLoadmore.current =
			(index - 1) * size + res.data.items.length < totalRecords
	})

	const setActive = useCallback((id: number | null) => {
		setActiveEditable(id)
	}, [])

	const saveData = useCallback(async (data: IDataDiary) => {
		setLoadingList((arr) => arr.concat([data._id]))
		await apiHandler(async () => {
			await myAxios.put(`/diary/${data._id}`, data)
			setList((arr) => {
				findAndReplace(arr, data, (item) => item._id === data._id)
				return [...arr]
			})
			toast('Edited successfully', {
				type: 'success',
			})
		})
		setLoadingList((arr) => arr.filter((id) => id !== data._id))
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
			await myAxios.delete(`/diary/${idDelete.current}`)
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
		fromDate: null | Date
		toDate: null | Date
	}>({
		fromDate: null,
		toDate: null,
	})

	useEffect(() => {
		if (!loading) {
			pageInfo.current.index = 0
			allowLoadmore.current = true
			getData([])
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
