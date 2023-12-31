import myAxios from '@/services/apiClient'
import { useLoad } from '@/services/apiHandler'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	useDisclosure,
} from '@nextui-org/react'
import moment from 'moment'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { toast } from 'react-toastify'
import diaryFormik from './diaryFormik'
import { IDataDiary } from './Item'
import { GrAdd } from 'react-icons/gr'
import ReactDatePicker from 'react-datepicker'
import DatePicker from '../DatePicker'
import { blockFuture } from '@/utils'
interface Props {
	setList: Dispatch<SetStateAction<IDataDiary[]>>
}

const Add: FC<Props> = ({ setList }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { loading, handler: onSubmit } = useLoad(async (values) => {
		try {
			const res = await myAxios.post('/api/diary', values)
			toast('Added successfully', {
				type: 'success',
			})
			onClose()
			setList((arr) => [res.data].concat(arr))
		} catch (err) {
			throw err
		}
	})

	const formik = diaryFormik(onSubmit)

	useEffect(() => {
		if (isOpen) {
			formik.resetForm()
			formik.setFieldValue('day', moment().format('DD/MM/YYYY HH:mm'))
		}
	}, [isOpen])

	return (
		<>
			<Button
				onPress={onOpen}
				color="success"
				className="font-medium text-white"
			>
				Add
				<GrAdd />
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent className="overflow-visible">
					<ModalHeader className="flex-col">Add Diary</ModalHeader>
					<ModalBody>
						<div className="flex items-center text-sm tracking-tight gap-x-2">
							<DatePicker
								selected={
									formik.values.day
										? moment(formik.values.day, 'DD/MM/YYYY HH:mm').toDate()
										: null
								}
								onChange={(date) => {
									formik.setFieldValue(
										'day',
										date ? moment(date).format('DD/MM/YYYY HH:mm') : null
									)
								}}
								dateFormat={'dd/MM/yyyy HH:mm'}
								isClearable
								showTimeInput
								filterDate={blockFuture}
							/>
							<span className="text-danger-400 text-xs">
								{formik.errors.day}
							</span>
						</div>

						<Textarea
							placeholder="Type something..."
							value={formik.values.content}
							onChange={formik.handleChange}
							name="content"
							onInput={() => formik.setFieldTouched('content', true)}
							errorMessage={formik.touched.content && formik.errors.content}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Close
						</Button>
						<Button
							color="success"
							onClick={() => formik.handleSubmit()}
							className="text-white"
							isLoading={loading}
						>
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Add
