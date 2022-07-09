import { useMemo, CSSProperties, useEffect } from 'react'
import { Link } from 'umi'
import { Page } from '@/components'
import { useImmer } from '@/hooks'
import { throttle } from '@/helper'
import { Ipost, menu } from './menu'
import styles from './index.less'

interface IWaterFall {
	list: Array<Ipost & { style: CSSProperties }>
	maxWidth: CSSProperties['width']
	maxHeight: CSSProperties['height']
	maxLen: number
}

const FIXEDHEIGHT = 260
const PADDING = 12 * 2

const getImageSize = async (url: string) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = url

		img.onload = function () {
			console.log(url, img.width)
		}
	})
}

export default function IndexPage() {
	const [post] = useImmer<Array<Ipost>>(menu)
	const [state, setState] = useImmer({
		scroll: 0,
		vh: 0,
	})
	const handleScroll = () => {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
		setState((draft) => {
			draft.scroll = scrollTop
		})
	}
	const handleResize = throttle(function () {
		setState((draft) => {
			if (draft.vh !== window.innerHeight) {
				draft.vh = window.innerHeight
			}
		})
	}, 500)

	useEffect(() => {
		document.body.classList.add('hide-scrollbar')
		window.addEventListener('scroll', handleScroll)
		window.addEventListener('resize', handleResize)
		return () => {
			document.body.classList.remove('hide-scrollbar')
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const waterFall = useMemo<IWaterFall>(() => {
		const columns: Array<number> = []
		let maxWidth: CSSProperties['width'] = 'auto'
		let maxHeight: CSSProperties['height'] = 'auto'
		let maxLen = 1
		const list = post.map((i, idx) => {
			maxLen = Math.floor(innerHeight / (FIXEDHEIGHT + PADDING))
			const or = FIXEDHEIGHT / (i.height / i.width)
			const width = or + PADDING
			let style: CSSProperties = {}
			let y = 0
			let x = 0
			maxHeight = maxLen * (FIXEDHEIGHT + PADDING)
			if (idx < maxLen) {
				columns.push(width)
				y = (FIXEDHEIGHT + PADDING) * idx
			} else {
				const min = Math.min(...columns)
				const minIndex = columns.indexOf(min)
				x = min
				y = minIndex * (FIXEDHEIGHT + PADDING)
				columns[minIndex] = min + width
			}
			maxWidth = Math.max(...columns)
			style = {
				transform: `translateX(${x}px) translateY(${y}px)`,
				width,
			}

			return {
				...i,
				style,
			}
		})
		return {
			list,
			maxHeight,
			maxWidth,
			maxLen,
		}
	}, [post, state.vh])

	return (
		<Page className={styles.home}>
			<div className={styles.scroll} style={{ height: typeof waterFall.maxWidth === 'number' ? waterFall.maxWidth : 'auto' }}></div>
			<div className={styles.content}>
				<aside className={styles.side}>
					<div className={styles.wrapper}>
						<a href="/" className={styles.logo}>
							<span>记衣</span>
						</a>
						<div className={styles.slogan}>
							<h1>
								观书有会意处，
								<br />
								题其<span className="danger-color">衣</span>裳，
								<br />以<span className="primary-color">记</span>其事
							</h1>
							<p>王嘉《拾遗记》</p>
						</div>
					</div>
				</aside>
				<div className={styles.menu}>
					<ul
						style={
							{
								width: waterFall.maxWidth,
								height: waterFall.maxHeight,
								// width: '100%',
								transform: `translateX(-${state.scroll}px) `,
								'--itemHeight': FIXEDHEIGHT + 'px',
								'--itemPadding': PADDING / 2 + 'px',
							} as CSSProperties
						}
					>
						{waterFall.list.map((i) => (
							<li key={i.id} style={{ ...i.style }}>
								<Link to={i.link} className={styles.box}>
									<img src={i.url + '?auto=compress&cs=tinysrgb&w=600&end=1'} />
									<div className={styles.info}>
										<h2>{i.title}</h2>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Page>
	)
}
