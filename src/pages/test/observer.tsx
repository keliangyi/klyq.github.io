import { Page } from '@/components'
import { FC, useEffect, useRef } from 'react'

/**
 * MutationObserver 监测自身属性或子元素
 * 如果要监测自身是否被删除，就只有再监测父元素
 * @returns
 *
 */
const Observer: FC = () => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref.current) {
			const observer = new MutationObserver(function (mutationsList, observer) {
				mutationsList.forEach((i) => {
					i.removedNodes.forEach((n) => {
						if (n === ref.current) {
							alert('??')
						}
					})
					console.log(i.target)
				})
			})
			observer.observe(document.getElementById('root')!, { childList: true, attributes: true, subtree: true })
		}
	}, [])
	return (
		<Page className="examplePage">
			<div ref={ref} id="watermark" className="container">
				<div style={{ width: 500, height: 400 }}>
					<h1>MutationObserver</h1>
				</div>
			</div>
		</Page>
	)
}

export default Observer
