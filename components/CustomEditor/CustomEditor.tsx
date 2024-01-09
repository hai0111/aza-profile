'use client'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import './CustomEditor.css'
import myAxios from '@/services/apiClient'

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

function MyCustomUploadAdapterPlugin(editor: any) {
	editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
		return new MyUploadAdapter(loader)
	}
}

function CustomEditor() {
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
			}}
		/>
	)
}
export default CustomEditor
