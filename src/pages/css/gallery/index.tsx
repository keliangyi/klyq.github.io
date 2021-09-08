import { FC, useEffect, CSSProperties } from 'react'
import { useImmer } from '@/hooks'
import { PEXELS_AUTHORIZATION } from '@/config'
import styles from './gallery.less'
import { Page } from '@/components'

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
			const res = await fetch('https://api.pexels.com/v1/search?query=mountain&per_page=30', {
				headers: {
					Authorization: PEXELS_AUTHORIZATION,
				},
			})
			const data = await res.json()
			setImgs(
				data.photos.map((item: any) => {
					// const bili = item.width / WIDTH
					// const height = item.height / bili
					return { id: item.id, src: `${item.src.tiny}'`, height: item.height, width: item.width }
				}),
			)
		}
		getImgs()
	}, [])

	return (
		<Page className={styles.gallery}>
			<div className={styles.wrapper}>
				{imgs.map((i) => {
					const width = (i.width * HEIGHT) / i.height
					return (
						<div key={i.id} className={styles.item} style={{ flexBasis: width, flexGrow: (i.width * 10) / i.height }}>
							<em style={{ paddingBottom: `${(i.height / i.width) * 100}%` }}></em>
							<img src={i.src} />
						</div>
					)
				})}
			</div>
		</Page>
	)
}

export default Gallery
