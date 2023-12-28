import Image from 'next/image'

const Overview = () => (
	<div className="flex flex-wrap justify-center items-center mt-5">
		<div className="flex-1 pb-4 min-w-max pe-2">
			<h2 className="text-4xl font-bold">Nguyen Van Hai</h2>
			<p className="mt-1">Website Developer ( React.js / Vue.js / MongoDB )</p>
		</div>

		<Image
			className="rounded-full border-2 border-white"
			src={'/images/me.jpg'}
			alt="..."
			width={100}
			height={100}
		/>
	</div>
)

export default Overview
