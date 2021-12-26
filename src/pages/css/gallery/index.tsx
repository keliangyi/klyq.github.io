import { FC, useEffect, ChangeEvent, FormEvent, useRef, CSSProperties, useMemo } from 'react'
import { useFetch, useFn, useImmer } from '@/hooks'
import { PEXELS_AUTHORIZATION } from '@/config'
import styles from './gallery.less'
import { Page, Icon } from '@/components'
import classNames from 'classnames'
import { throttle } from '@/helper'

interface Iimage {
	id: number
	src: string
	width: number
	height: number
}

const WIDTH = 300
const HEIGHT = 240
const SIZE = 600

const CURATED = ['nature', 'mountain', 'sea']

const SHOWTYPE = {
	// enum 也可以
	default: Symbol(),
	waterFall: Symbol(),
}

const Gallery: FC = () => {
	const container = useRef<HTMLElement>(null)

	const [state, setState] = useImmer({
		showType: SHOWTYPE.waterFall,
		query: '',
		wrapperWidth: '100%',
		vw: 0,
	})

	const {
		data = [],
		run,
		loading,
	} = useFetch<Iimage[]>(`https://api.pexels.com/v1/search`, {
		headers: {
			Authorization: PEXELS_AUTHORIZATION,
		},
		method: 'get',
		body: {
			query: state.query || CURATED[Math.floor(Math.random() * CURATED.length)],
			per_page: 30,
		},
		ref: container,
		loadMore: true,
		formatResult(d) {
			return d.photos.map((item: any, idx: number) => {
				if (idx === 9) {
					return {
						id: item.id,
						src: `https://img.weixiaoqu.com/images/uploads/5741/202109/8a29aa3de3a716b6a7b2f1c2e962dc85.png`,
						height: 2300,
						width: 658,
					}
				}
				return {
					id: item.id,
					src: `${item.src.original}?auto=compress&cs=tinysrgb&${state.showType === SHOWTYPE.waterFall ? 'w' : 'h'}=${SIZE}&end=1'`,
					height: item.height,
					width: item.width,
				}
			})
			// .filter((_: any, x: number) => x < 8)
		},
	})

	const handleInputChange = useFn((e: ChangeEvent<HTMLInputElement>) => {
		e.persist()
		setState((draft) => {
			draft.query = e.target.value
		})
	})

	const handleToggleShowType = useFn(() => {
		setState((draft) => {
			draft.showType = draft.showType === SHOWTYPE.default ? SHOWTYPE.waterFall : SHOWTYPE.default
		})
	})

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		run()
	}

	useEffect(() => {
		window.addEventListener(
			'resize',
			throttle(function () {
				setState((draft) => {
					if (draft.vw !== window.innerWidth) {
						draft.vw = window.innerWidth
					}
				})
			}, 500),
		)
		return () => {
			window.removeEventListener('resize', function () {
				setState(() => null)
			})
		}
	}, [window.innerWidth])

	const memo = useMemo<{ list: Array<Iimage & { style: CSSProperties }>; maxWidth: string; maxHeight: string }>(() => {
		let maxWidth = 'auto'
		let maxHeight = 'auto'
		const rows: number[] = []
		const list = data.map((i, idx) => {
			let itemStyle: CSSProperties = {}
			if (state.showType === SHOWTYPE.waterFall) {
				const PADDING = 10 * 2
				const maxLen = Math.floor(window.innerWidth / WIDTH)
				const height = (WIDTH - PADDING) / (i.width / i.height) + PADDING
				let y = 0
				let x = 0
				maxWidth = `${maxLen * WIDTH}px`
				if (idx < maxLen) {
					rows.push(height)
					x = idx * WIDTH
				} else {
					const min = Math.min(...rows)
					const minIndex = rows.indexOf(min)
					y = min
					x = minIndex * WIDTH
					rows[minIndex] = min + height
				}
				maxHeight = Math.max(...rows) + 'px'
				itemStyle = {
					transform: `translateX(${x}px) translateY(${y}px)`,
					height,
				}
			} else {
				const width = (i.width * HEIGHT) / i.height
				itemStyle = { flexBasis: width, flexGrow: (i.width * 10) / i.height }
			}
			return { ...i, style: itemStyle }
		})

		return {
			list,
			maxWidth,
			maxHeight,
		}
	}, [state.showType, data, state.vw])

	return (
		<Page className={styles.gallery}>
			<section className={styles.top}>
				<div className={styles.content}>
					<h1 className={styles.title}>The best free stock photos shared by talented creators.</h1>
					<div className={styles.searchBar}>
						<form onSubmit={handleSearch} className={styles.searchForm}>
							<input
								type="text"
								value={state.query}
								className={styles.searchInput}
								onChange={handleInputChange}
								placeholder="搜索免费的图片"
							/>
							<div className={styles.icon} onClick={handleToggleShowType}>
								{state.showType === SHOWTYPE.default ? (
									<Icon title="瀑布流" type="icon-pubuliu" />
								) : (
									<Icon title="默认布局" type="icon-layout-f" />
								)}
							</div>
						</form>
					</div>
				</div>
			</section>
			<section
				style={{ width: memo.maxWidth, height: memo.maxHeight }}
				className={classNames(styles.wrapper, {
					[styles.waterFall]: state.showType === SHOWTYPE.waterFall,
					[styles.defaultLayout]: state.showType === SHOWTYPE.default,
				})}
				ref={container}
			>
				{memo.list.map((i, idx) => {
					return (
						<a
							// href={i.src}
							// download="ad"
							key={i.id}
							className={styles.item}
							style={{ ...i.style, '--width': WIDTH } as CSSProperties}
						>
							<em style={{ paddingBottom: `${(i.height / i.width) * 100}%` }}></em>
							<div className={styles.picture}>
								<img src={i.src} data-src={i.src} />
							</div>
						</a>
					)
				})}
			</section>
			<div style={{ fontSize: 24, textAlign: 'center' }}>{loading ? '加载中....' : ''}</div>
		</Page>
	)
}

export default Gallery
