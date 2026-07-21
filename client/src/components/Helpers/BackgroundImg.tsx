import { LOGO_IMG } from '../../data'

function BackgroundImg() {
	return (
		<>
			<div className='fixed inset-0 z-0'>
				<img
					src={LOGO_IMG}
					alt='Modern dark interior'
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-linear-to-b from-black/90 via-black/40 to-black/95'></div>
			</div>
		</>
	)
}

export default BackgroundImg
