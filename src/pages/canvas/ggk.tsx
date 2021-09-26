import { FC, useRef, useEffect, MouseEvent } from 'react'
import { Page } from '@/components'

import { useImmer } from '@/hooks'

import styles from './canvas.less'

const zh = ['一', '二', '三']

const Ggk: FC = () => {
	const [prize, setPrize] = useImmer(Math.floor(Math.random() * zh.length))
	const isDown = useRef(false)
	const canvas = useRef<HTMLCanvasElement>(null)
	const context = useRef<CanvasRenderingContext2D>()

	useEffect(() => {
		init()
	}, [])

	const init = () => {
		if (canvas.current) {
			context.current = canvas.current.getContext('2d') as CanvasRenderingContext2D
			const cover = new Image()
			cover.src = 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg'
			cover.onload = () => {
				context.current!.drawImage(cover, 0, 0)
			}
		}
	}

	const onMouseDown = () => {
		isDown.current = true
	}

	const onMouseUp = () => {
		isDown.current = false
	}

	const handleReset = () => {
		init()
	}

	const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		const { current: ctx } = context
		if (ctx && isDown.current) {
			const x = e.nativeEvent.offsetX
			const y = e.nativeEvent.offsetY
			ctx.beginPath()
			ctx.arc(x, y, 50, 0, Math.PI * 2)
			ctx.fillStyle = 'rgba(255,255,255,.9)'
			ctx.fill()
			ctx.globalCompositeOperation = 'destination-out'
		}
	}

	return (
		<Page>
			<div className={styles.ggk}>
				<canvas ref={canvas} width={1100} height={482} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} />
				<div style={{ height: 482 }} className={styles.content}>
					{zh[prize]}等奖
				</div>
			</div>
		</Page>
	)
}

export default Ggk
