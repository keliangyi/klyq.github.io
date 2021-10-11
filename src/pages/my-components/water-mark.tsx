import { FC } from 'react'
import { Watermark, Page } from '@/components'

const CompoentWatermark: FC = () => {
	return (
		<Page className="examplePage">
			<Watermark text="毛毛 — klyq.github.io">
				<div style={{ width: '100vw', height: '100vh' }}>
					<div>
						<img src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600&end=1" />
					</div>
					<h2 style={{ height: 100, background: 'deepskyblue' }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo mollitia iusto maiores a. Perspiciatis atque quos
						eveniet assumenda sint non necessitatibus libero, voluptatem dolorum, fugiat placeat alias aspernatur? Sapiente?
					</h2>
				</div>
			</Watermark>
		</Page>
	)
}

export default CompoentWatermark
