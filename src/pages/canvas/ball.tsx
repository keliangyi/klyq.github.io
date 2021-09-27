import { FC, useRef, useEffect, MouseEvent } from 'react'
import { Page } from '@/components'

import { useFn, useImmer } from '@/hooks'

import styles from './canvas.less'

class Ball {
	x: number
	y: number
	dx: number
	dy: number
	radius: number
	minRadius: number
	color: string
	ctx: CanvasRenderingContext2D

	static maxRadius = 40
	static colorArray = [
		'#e42c64',
		'#614ad3',
		'#aeeff0',
		'#614ad3',
		'#daa592',
		'#f1f0d1',
		'#f7b71d',
		'#010059',
		'#313131',
		'#10eaf0',
		'#8a00d4',
		'#009975',
		'#58b368',
	]

	constructor(ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, radius: number) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.radius = radius
		this.minRadius = radius
		this.color = Ball.colorArray[Math.floor(Math.random() * Ball.colorArray.length)]
	}

	draw() {
		const { ctx } = this
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	update(mouse: { x: number; y: number }) {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
		}
		this.x += this.dx
		this.y += this.dy

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < Ball.maxRadius) {
				this.radius += 1
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1
		}

		this.draw()
	}
}

const BallPage: FC = () => {
	const [mouse, setMouse] = useImmer({ x: 0, y: 0 })
	const [circles, setCircles] = useImmer<Ball[]>([])

	const canvas = useRef<HTMLCanvasElement>(null)
	const context = useRef<CanvasRenderingContext2D>()

	useEffect(() => {
		init()
		window.addEventListener('resize', onResize)
		window.addEventListener('mousemove', onMouseMove)
		return () => {
			window.removeEventListener('resize', onResize)
			window.removeEventListener('mousemove', onMouseMove)
		}
	}, [])

	const onResize = () => {
		if (canvas.current) {
			canvas.current.width = innerWidth
			canvas.current.height = innerHeight
		}
	}
	const onMouseMove = (e: any) => {
		const { x, y } = e
		setMouse({ x, y })
	}

	const init = useFn(() => {
		if (canvas.current) {
			context.current = canvas.current.getContext('2d') as CanvasRenderingContext2D
			canvas.current.width = innerWidth
			canvas.current.height = innerHeight
			const circleArray: Ball[] = []
			for (let i = 0; i < 1000; i++) {
				const radius = Math.random() * 30 + 1
				const x = Math.random() * (innerWidth - 2 * radius) + radius
				const y = Math.random() * (innerHeight - 2 * radius) + radius
				const dx = (Math.random() - 0.5) * 3
				const dy = (Math.random() - 0.5) * 3
				circleArray.push(new Ball(context.current, x, y, dx, dy, radius))
			}
			setCircles(circleArray)
			animate()
		}
	})

	const animate = useFn(() => {
		const { current: ctx } = context
		requestAnimationFrame(animate.bind(null, mouse))
		ctx!.clearRect(0, 0, innerWidth, innerHeight)
		for (let index = 0; index < circles.length; index++) {
			circles[index].update(mouse)
		}
	})

	return (
		<Page className={styles.ball}>
			<canvas ref={canvas} />
		</Page>
	)
}

export default BallPage
