'use client'
import { PropsWithChild } from '@/app/types'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import Loading from './Loading'

interface Props extends PropsWithChild {
	suspense?: ReactNode
}

const LoadingWrapper: FC<Props> = ({ children, suspense = <Loading /> }) => {
	const [load, setLoad] = useState(false)
	useEffect(() => {
		setLoad(true)
	}, [])
	return load ? children : suspense
}

export default LoadingWrapper
