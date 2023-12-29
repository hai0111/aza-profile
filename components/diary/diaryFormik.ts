import { IDiary } from '@/models/Diary'
import { useFormik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
	content: Yup.string().required('Required'),
	day: Yup.string().required('Required'),
})

const diaryFormik = (onSubmit: (...p: any) => void, initData?: IDiary) =>
	useFormik({
		initialValues: initData || {
			content: '',
			interest: false,
			day: moment().format('DD/MM/YYYY HH:mm'),
		},
		onSubmit,
		validationSchema,
	})

export default diaryFormik
