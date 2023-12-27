import myAxios from '@/services/apiClient'
import useDate from '@/utils/useDate'
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
import { useFormik } from 'formik'
import moment from 'moment'
import { FC } from 'react'

interface Props {
	getData(): Promise<any>
}

const Add: FC<Props> = ({ getData }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { dateTime, DatePicker, setDateTime } = useDate()

	const formik = useFormik({
		initialValues: {
			content: '',
			interest: false,
			day: moment().format('DD/MM/YYYY HH:mm'),
		},
		onSubmit: async (values) => {
			try {
				const res = await myAxios.post('/api/diary', values)
				console.log(getData)
				getData()
				onClose()
			} catch (err) {
				throw err
			}
		},
	})

	return (
		<>
			<Button
				onPress={onOpen}
				color="success"
				className="font-medium text-white"
			>
				Add
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className="flex-col">Add Diary</ModalHeader>
					<ModalBody>
						<div className="flex items-center text-sm tracking-tight gap-x-2">
							{dateTime}
							<DatePicker
								onValueChange={(val) => formik.setFieldValue('day', val)}
							/>
						</div>
						<Textarea
							placeholder="Type something..."
							value={formik.values.content}
							onChange={formik.handleChange}
							name="content"
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
