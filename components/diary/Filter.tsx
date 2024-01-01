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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { LuFilter } from 'react-icons/lu'

interface Props {
	setDataSearch: Dispatch<
		SetStateAction<{
			fromDate: null | Date
			toDate: null | Date
		}>
	>
}

const Filter: FC<Props> = ({ setDataSearch }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	const [fromDate, setFromDate] = useState<Date | null>(null)
	const [toDate, setToDate] = useState<Date | null>(null)
	const filterDateFrom = (date: Date) => {
		return (
			moment(date).isSameOrBefore(moment()) &&
			(moment(date).isSameOrBefore(moment(toDate)) || !toDate)
		)
	}

	const filterDateTo = (date: Date) => {
		return (
			(moment(date).isSameOrAfter(moment(fromDate)) || !fromDate) &&
			moment(date).isSameOrBefore(moment())
		)
	}

	const handleSearch = () => {
		setDataSearch({
			fromDate,
			toDate,
		})
		onClose()
	}

	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				className="font-medium text-white"
			>
				Filter
				<LuFilter />
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="overflow-visible">
					<ModalHeader className="items-center gap-1">
						Filter
						<LuFilter />
					</ModalHeader>
					<ModalBody>
						<table className="w-min mx-auto">
							<tbody>
								<tr>
									<td className="pb-3">From:</td>
									<td className="pb-3">
										<ReactDatePicker
											className="ms-2 p-1 px-2 rounded"
											dateFormat={'dd/MM/yyyy'}
											selected={fromDate}
											onChange={setFromDate}
											filterDate={filterDateFrom}
											isClearable
											placeholderText="DD/MM/YYYY"
										/>
									</td>
								</tr>
								<tr>
									<td>To:</td>
									<td>
										<ReactDatePicker
											className="ms-2 p-1 px-2 rounded"
											dateFormat={'dd/MM/yyyy'}
											selected={toDate}
											onChange={setToDate}
											filterDate={filterDateTo}
											isClearable
											placeholderText="DD/MM/YYYY"
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Close
						</Button>
						<Button
							color="success"
							className="text-white"
							onPress={handleSearch}
						>
							Search
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Filter
