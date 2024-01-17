'use client'
import myAxios from '@/services/apiClient'
import dynamic from 'next/dynamic'
import { FC, memo, useEffect, useRef, useState } from 'react'
import LoadOverScreen from '../load/LoadOverScreen'
import './CustomEditor.css'

const CKEditor = dynamic(
	async () => (await import('@ckeditor/ckeditor5-react')).CKEditor,
	{
		loading: () => <LoadOverScreen />,
		ssr: false,
	}
)

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

const CustomEditor: FC<{ value?: string; onChange?(value: string): void }> =
	function ({ onChange, value }) {
		const EditorRef = useRef<any>()
		useEffect(() => {
			EditorRef.current = require('ckeditor5-custom-build')
		}, [])

		const [data, setData] = useState<string>('')
		useEffect(() => {
			setData(value || '')
		}, [value])

		return (
			EditorRef.current && (
				<CKEditor
					editor={EditorRef.current}
					config={{
						extraPlugins: [MyCustomUploadAdapterPlugin],
						toolbar: {
							shouldNotGroupWhenFull: true,
						},
					}}
					data={data}
					onChange={(event: any, editor: any) => {
						const data = editor.getData()
						setData(data)
						if (onChange) onChange(data)
					}}
				/>
			)
		)
	}
export default memo(CustomEditor)
