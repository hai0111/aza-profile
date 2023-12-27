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

const Add = () => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
	const { dateTime, DatePicker, setDateTime } = useDate()

	const formik = useFormik({
		initialValues: {
			content: '',
			interest: false,
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2))
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
							{dateTime} <DatePicker />
						</div>
						<form onSubmit={formik.handleSubmit}>
							<Textarea
								placeholder="Type something..."
								value={formik.values.content}
								onChange={formik.handleChange}
								name="content"
							/>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button color="danger" variant="light" onPress={onClose}>
							Close
						</Button>
						<Button color="success" onPress={onClose} className="text-white">
							Save
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Add
