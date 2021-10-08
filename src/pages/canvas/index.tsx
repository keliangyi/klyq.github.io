import { FC, useEffect, useRef, MouseEvent } from 'react'
import { Canvas, Page } from '@/components'
import { useFn, useImmer, useRAF } from '@/hooks'
import { ISize } from '@/components/canvas'
import { betweenRandom, throttle } from '@/util'

const w = innerWidth
const h = innerHeight

class Particle {
	ctx: CanvasRenderingContext2D
	x: number
	y: number
	size: number
	speedX: number
	speedY: number
	hue: number

	constructor(ctx: CanvasRenderingContext2D, x?: number, y?: number, hue?: number) {
		this.ctx = ctx
		this.size = Math.random() * 30 + 1
		this.x = x ?? betweenRandom(this.size, w - this.size)
		this.y = y ?? betweenRandom(this.size, h - this.size)
		this.speedX = Math.random() * 6 - 3
		this.speedY = Math.random() * 6 - 3
		this.hue = hue ?? 0
	}

	update() {
		if (this.x + this.size >= innerWidth || this.x - this.size < 0) {
			this.speedX = -this.speedX
		}
		if (this.y + this.size >= innerHeight || this.y - this.size < 0) {
			this.speedY = -this.speedY
		}
		this.x += this.speedX
		this.y += this.speedY
		if (this.size > 1) {
			this.size -= 0.1
		}
	}

	draw(hue: number) {
		const { ctx } = this
		ctx.fillStyle = `hsl(${hue},100%,50%)`
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fill()
	}
}

const Frank: FC = () => {
	const [particles, setParticle] = useImmer<Particle[]>([])
	const ctx = useRef<CanvasRenderingContext2D>()
	const hue = useRef(0)
	const { animate } = useRAF((ctx: CanvasRenderingContext2D, time = 0) => {
		// ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
		ctx.fillStyle = 'rgba(0,0,0,.21)'
		ctx.fillRect(0, 0, w, h)

		clearParticle()
		draw()
		hue.current += 2
	})

	const clearParticle = useFn(() => {
		if (particles.length !== 0) {
			setParticle((draft) => {
				return draft.filter((f) => f.size > 1)
			})
		}
	})

	const handleCanvasReady = useFn((c: CanvasRenderingContext2D) => {
		animate(c)
		ctx.current = c
	})

	const draw = useFn(() => {
		particles.forEach((i) => {
			i.update()
			i.draw(hue.current)
		})
	})

	const handleMouseMove = ({ pageX, pageY }: MouseEvent<HTMLCanvasElement>) => {
		if (ctx.current) {
			setParticle((draft) => {
				const c: any[] = []
				for (let i = 0; i < 200; i++) {
					c.push(new Particle(ctx.current!, pageX, pageY))
				}
				return draft.concat(c)
			})
		}
	}

	return (
		<Page>
			<Canvas resize className="resizeCanvas" onMount={handleCanvasReady} onClick={handleMouseMove} />
		</Page>
	)
}

export default Frank
