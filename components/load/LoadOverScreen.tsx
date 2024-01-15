import React from 'react'
import styles from '@/components/load/styles.module.scss'

const LoadOverScreen = () => {
	return (
		<div className="fixed inset-0 flex justify-center items-center">
			<div className={styles.spinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default LoadOverScreen
