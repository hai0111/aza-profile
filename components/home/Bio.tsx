import React, { ReactNode } from 'react'

const Bios: { time: string; content: ReactNode }[] = [
	{
		time: '2001',
		content: 'Born in 2001 in Thuong Tin district, Hanoi city',
	},
	{
		time: '2019',
		content:
			'Enrolled in a vocational college at the HANOI VOCATIONAL COLLEGE OF TECHNOLOGY',
	},
	{
		time: '09/2021',
		content: (
			<>
				Taking advantage of the isolation period during <br /> the COVID-19
				pandemic, he began studying and exploring front-end development
			</>
		),
	},
	{
		time: '03/2022',
		content: 'Commenced the first internship term at Diligo Holding.',
	},
	{
		time: '11/2021',
		content:
			'Became a front-end developer at Xtel Company - a firm that undertakes numerous projects across various fields',
	},
	{
		time: '09/2022',
		content:
			"Graduated with a Bachelor's degree in Applied Engineering, specializing in Information Technology.",
	},
]

const Bio = () => (
	<div className="mt-6">
		<h3 className="text-xl font-bold underline decoration-4 decoration-gray-500 underline-offset-4">
			Bio
		</h3>

		<table className="mt-2">
			<tbody>
				{Bios.map(({ content, time }) => (
					<tr key={time + content} className="leading-5 align-top">
						<td className="pr-5 py-2 text-start">
							<strong>{time}</strong>
						</td>
						<td className="py-2 text-start">{content}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
)

export default Bio
