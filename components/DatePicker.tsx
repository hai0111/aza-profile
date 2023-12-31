import clsx from 'clsx'
import React, { FC } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

const DatePicker: FC<ReactDatePickerProps> = ({
	dateFormat = 'dd/MM/yyyy',
	...props
}) => {
	return (
		<ReactDatePicker
			{...props}
			className={clsx(props.className, 'py-1 px-2 rounded')}
			dateFormat={dateFormat}
			placeholderText={dateFormat.toString()}
			isClearable
		/>
	)
}

export default DatePicker
