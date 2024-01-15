'use client'
import myAxios from '@/services/apiClient'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import { FC, memo, useState } from 'react'
import './CustomEditor.css'
 
class MyUploadAdapter {
	constructor(public loader: any) {
		this.loader = loader
	}
	async upload() {
		const file = (await this.loader.file) as File
		const formData = new FormData()

		formData.set('file', file)
 
		const res = await myAxios.post('/upload', formData)
		return {
			default: res.data?.url,
		}
	}
	abort() {}
}

const MyCustomUploadAdapterPlugin = function (editor: any) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
		return new MyUploadAdapter(loader)
	}
}

const CustomEditor: FC<{ onChange?(value: string): void }> = function ({
	onChange,
}) {
	const [data, setData] = useState<string>('')

	return (
		<CKEditor
			editor={Editor}
			config={{
				extraPlugins: [MyCustomUploadAdapterPlugin],
				toolbar: {
					shouldNotGroupWhenFull: true,
				},
			}}
			data={data}
			onChange={(event, editor) => {
				const data = editor.getData()
				setData(data)
				if (onChange) onChange(data)
			}}
		/>
	)
}
export default memo(CustomEditor)
