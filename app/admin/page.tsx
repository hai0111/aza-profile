'use client'
import Container from '@/components/Container'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import * as Yup from 'yup'

const page = () => {
	const router = useRouter()
	const validationSchema = Yup.object().shape({
		username: Yup.string().required('Required'),
		password: Yup.string().required('Required'),
	})

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		async onSubmit(values) {
			formik.setTouched({ password: true, username: true })
			const res = await signIn('credentials', { ...values, redirect: false })
			if (res?.ok) {
				router.back()
				router.refresh()
			}
		},
		validationSchema,
		validateOnBlur: true,
	})
	return (
		<Container className="pt-14">
			<div className="text-3xl flex items-center justify-center">
				Welcome back Admin <MdOutlineAdminPanelSettings />
			</div>

			<div className="flex flex-col gap-4 mt-8 sm:items-center">
				<Input
					label="Username"
					name="username"
					value={formik.values.username}
					onChange={formik.handleChange}
					onBlur={() => formik.setFieldTouched('username', true)}
					errorMessage={formik.touched.username && formik.errors.username}
				/>
				<Input
					label="Password"
					type="password"
					name="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={() => formik.setFieldTouched('password', true)}
					errorMessage={formik.touched.password && formik.errors.password}
				/>

				<Button color="success" size="lg" onClick={formik.submitForm}>
					Login
				</Button>
			</div>
		</Container>
	)
}

export default page
