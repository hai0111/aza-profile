import styles from '@/components/upload/styles.module.scss'
import myAxios from '@/services/apiClient'
import { useLoad } from '@/services/apiHandler'
import { uploadFile } from '@/utils'
import { Button, Input } from '@nextui-org/react'
import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { PiUploadSimpleThin } from 'react-icons/pi'
import { toast } from 'react-toastify'

interface Props {
	value?: string
	onValueChange?(str: string): void
}

const UploadFile: FC<Props> = ({ onValueChange, value: valueProp }) => {
	const [value, setValue] = useState<string>('')
	const inputRef = useRef<HTMLInputElement>(null)
	const clickUpload = () => {
		inputRef.current?.click()
	}

	const { loading, handler: handleUploadFile } = useLoad(async (file: File) => {
		try {
			const url = await uploadFile(file)
			setValue(url)
			toast('Upload successfully', {
				type: 'success',
			})
		} catch (error) {
			toast('Something went wrong', {
				type: 'error',
			})
		}
	})

	const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (
		evt
	) => {
		const file = evt.target.files?.[0]
		if (!file) return
		handleUploadFile(file)
		// Reset upload input
		evt.target.value = ''
	}

	const handleClear = () => {
		setValue('')
	}

	useEffect(() => {
		onValueChange && onValueChange(value)
	}, [value])

	useEffect(() => {
		setValue(valueProp || '')
	}, [valueProp])

	return (
		<>
			<Input
				value={value}
				size="sm"
				placeholder="Thumbnail"
				className={styles.wrapper}
				endContent={
					<div className="flex items-center">
						{value && (
							<Button
								isIconOnly
								size="sm"
								className="text-xl me-2 bg-transparent p-0 rounded-full"
								onClick={handleClear}
							>
								<IoCloseOutline />
							</Button>
						)}

						<Button
							color="success"
							className="text-large"
							isLoading={loading}
							onClick={clickUpload}
						>
							<PiUploadSimpleThin />
						</Button>
					</div>
				}
				onValueChange={setValue}
			/>

			<input ref={inputRef} hidden type="file" onChange={handleChangeFile} />
		</>
	)
}

export default UploadFile
