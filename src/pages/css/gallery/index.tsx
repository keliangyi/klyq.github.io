import { FC, useEffect } from 'react'
import { useImmer } from '@/hooks'
import { PEXELS_AUTHORIZATION } from '@/config'
import styles from './gallery.less'

interface Iimage {
	id: number
	src: string
	width: number
	height: number
}

const WIDTH = 320
const HEIGHT = 240

const Gallery: FC = () => {
	const [imgs, setImgs] = useImmer<Iimage[]>([])

	const getImgInfo = (src: string): Promise<HTMLImageElement> => {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = async function () {
				resolve(img)
			}
			img.src = src + '?auto=compress&w=300'
		})
	}

	useEffect(() => {
		const getImgs = async () => {
			const res = await fetch('https://api.pexels.com/v1/curated?per_page=20', {
				headers: {
					Authorization: PEXELS_AUTHORIZATION,
				},
			})
			const data = await res.json()
			setImgs(
				data.photos.map((item: any) => {
					const bili = item.width / WIDTH
					const height = item.height / bili
					return { id: item.id, src: `${item.src.original}?auto=compress&w=${WIDTH}'`, height, width: WIDTH }
				}),
			)
		}
		getImgs()
	}, [])

	return (
		<div className={styles.gallery}>
			<section className={styles.top}>{/* <img src="" alt="" srcSet="" /> */}</section>
			<section className={styles.wrapper}>
				{imgs.map((i) => (
					<div key={i.id} className={styles.item} style={{ width: (WIDTH * HEIGHT) / i.height ?? 0 }}>
						<img
							src={i.src}
							// onLoad={(e) => handleImgLoad(e, i.id)}
						/>
					</div>
				))}
			</section>
		</div>
	)
}

export default Gallery
