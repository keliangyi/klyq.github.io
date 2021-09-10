import { FC, useEffect, ChangeEvent, FormEvent } from 'react'
import { useFetch, useFn, useImmer } from '@/hooks'
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
	const [state, setState] = useImmer({
		query: 'mountain',
	})

	const { data = [], run } = useFetch<Iimage[]>(`https://api.pexels.com/v1/search?query=${state.query}&per_page=30`, {
		headers: {
			Authorization: PEXELS_AUTHORIZATION,
		},
		formatResult(d) {
			return d.photos.map((item: any) => {
				return { id: item.id, src: `${item.src.tiny}'`, height: item.height, width: item.width }
			})
		},
	})

	const handleInputChange = useFn((e: ChangeEvent<HTMLInputElement>) => {
		e.persist()
		setState((draft) => {
			draft.query = e.target.value
		})
	})

	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		run()
	}

	return (
		<div className={styles.gallery}>
			<section className={styles.top}>
				<div className={styles.content}>
					<h1 className={styles.title}>The best free stock photos shared by talented creators.</h1>
					<div className={styles.searchBar}>
						<form onSubmit={handleSearch}>
							<input
								type="text"
								value={state.query}
								className={styles.searchInput}
								onChange={handleInputChange}
								placeholder="搜索免费的图片"
							/>
						</form>
					</div>
				</div>
			</section>
			<section className={styles.wrapper}>
				{data.map((i) => {
					const width = (i.width * HEIGHT) / i.height
					return (
						<a
							href={i.src}
							download="ad"
							key={i.id}
							className={styles.item}
							style={{ flexBasis: width, flexGrow: (i.width * 10) / i.height }}
						>
							<em style={{ paddingBottom: `${(i.height / i.width) * 100}%` }}></em>
							<img src={i.src} />
						</a>
					)
				})}
			</section>
		</div>
	)
}

export default Gallery
