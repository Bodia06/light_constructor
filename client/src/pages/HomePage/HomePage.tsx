import LightAnimation from '../../animations/LightAnimation/LightAnimation'
import BackgroundImg from '../../components/Helpers/BackgroundImg'
import CardInfo from '../../components/HomeComponents/CardInfo/CardInfo'
import GlobalInfo from '../../components/HomeComponents/GlobalInfo/GlobalInfo'
import { useLogoHover } from '../../hooks/useLogoHover'
import { HOME_CARDS_INFO } from '../../data'

export default function HomePage() {
	const { isLogoHovered } = useLogoHover()
	return (
		<div className='relative min-h-screen bg-neutral-900 text-white overflow-x-hidden flex flex-col'>
			<LightAnimation isLogoHovered={isLogoHovered} />
			<BackgroundImg />

			<section className='relative z-10 grow flex flex-col items-center justify-center pt-24 pb-16 px-6'>
				<GlobalInfo />
				{/* CARDS */}
				<div className='grid md:grid-cols-2 gap-8 max-w-6xl w-full'>
					{HOME_CARDS_INFO.map((item) => {
						return <CardInfo key={item.title} card={item} />
					})}
				</div>
			</section>
		</div>
	)
}
