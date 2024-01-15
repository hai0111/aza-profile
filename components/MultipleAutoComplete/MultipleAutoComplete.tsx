'use client'
import clsx from 'clsx'
import { AutoComplete } from 'primereact/autocomplete'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

const MultipleAutoComplete = <T extends {}>({
	items,
	field,
	onSearch,
	placeholder,
	onChange,
}: {
	items: T[]
	placeholder?: string
	field: string
	onSearch(query: string): Promise<void> | void
	onChange(values: T[]): void
}) => {
	const [values, setValues] = useState<T[]>([])

	useEffect(() => {
		onChange(values)
	}, [values])

	return (
		<div className="card p-fluid">
			<AutoComplete
				value={values}
				suggestions={items}
				placeholder={placeholder}
				field={field}
				className={clsx(
					'min-h-unit-12 bg-default-100 rounded-lg p-1.5',
					styles['custom-autocomplete']
				)}
				panelClassName={clsx(
					'bg-content1 rounded-lg p-3 custom-scroll',
					styles['item-autocomplete']
				)}
				multiple
				completeMethod={(event) => onSearch(event.query)}
				onChange={(e) => setValues(e.value)}
			/>
		</div>
	)
}

export default MultipleAutoComplete
