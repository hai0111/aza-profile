import TypingAnimation from '../TypingAnimation'

const texts = ["Welcome to Aza's articles", 'Hope your day is wonderful']

const Banner = () => {
	return (
		<div className="aspect-[5/2] lg:aspect-[4/1] bg-[linear-gradient(rgba(180,180,180,0.2),rgba(180,180,180,0.2)),url('/images/post-banner.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/post-banner.jpg')] bg-cover bg-center flex justify-center items-center">
			<h2 className="text-5xl tracking-wider typing">
				<TypingAnimation texts={texts} />
			</h2>
		</div>
	)
}

export default Banner
