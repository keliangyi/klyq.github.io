import { FC, useEffect, ChangeEvent, FormEvent, useRef } from 'react'
import { useFetch, useFn, useImmer } from '@/hooks'
import { PEXELS_AUTHORIZATION } from '@/config'
import styles from './gallery.less'
import { Page, Icon } from '@/components'

interface Iimage {
	id: number
	src: string
	width: number
	height: number
}

const WIDTH = 320
const HEIGHT = 240

const CURATED = ['nature', 'mountain', 'sea']

const Gallery: FC = () => {
	const container = useRef<HTMLElement>(null)

	const [state, setState] = useImmer({
		perfix: '',
		query: '',
	})

	const { data = [], run } = useFetch<Iimage[]>(`https://api.pexels.com/v1/search`, {
		headers: {
			Authorization: PEXELS_AUTHORIZATION,
		},
		method: 'get',
		body: {
			query: state.query || CURATED[Math.floor(Math.random() * CURATED.length)],
			per_page: 30,
		},
		ref: container,
		formatResult(d) {
			return d.photos.map((item: any) => {
				return {
					id: item.id,
					src: `${item.src.original}?auto=compress&cs=tinysrgb&h=300&end=1'`,
					height: item.height,
					width: item.width,
				}
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
		<Page className={styles.gallery}>
			<section className={styles.top}>
				<div className={styles.content}>
					<h1 className={styles.title}>
						The best free stock photos shared by talented creators.
					</h1>
					<div className={styles.searchBar}>
						<form onSubmit={handleSearch} className={styles.searchForm}>
							<input
								type="text"
								value={state.query}
								className={styles.searchInput}
								onChange={handleInputChange}
								placeholder="搜索免费的图片"
							/>
							<div className={styles.icon}>
								<Icon type="icon-pubuliu" />
							</div>
						</form>
					</div>
				</div>
			</section>
			<section className={styles.wrapper} ref={container}>
				{data.map((i) => {
					const width = (i.width * HEIGHT) / i.height
					return (
						<a
							// href={i.src}
							// download="ad"
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
		</Page>
	)
}

export default Gallery
