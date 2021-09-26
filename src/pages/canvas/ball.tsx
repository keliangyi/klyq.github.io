import { FC, useRef, useEffect, MouseEvent } from 'react'
import { Page } from '@/components'

import { useImmer } from '@/hooks'

import styles from './canvas.less'

const MAXRADIUS = 40
const COLORARRAY = [
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

// let circleArray = []

// window.addEventListener('resize', function () {
//     canvas.width = innerWidth
//     canvas.height = innerHeight
// })

// window.addEventListener('mousemove', function (event) {
//     const { x, y } = event
//     mouse = { x, y }
// })

// function Cricle(x, y, dx, dy, radius) {
//     this.x = x
//     this.y = y
//     this.dx = dx
//     this.dy = dy
//     this.radius = radius
//     this.minRadius = radius
//     this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

//     this.draw = function () {
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//         ctx.fillStyle = this.color
//         ctx.fill()
//     }

//     this.update = function () {
//         if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//             this.dx = -this.dx
//         }
//         if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//             this.dy = -this.dy
//         }
//         this.x += this.dx
//         this.y += this.dy

//         if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
//             if (this.radius < maxRadius) {
//                 this.radius += 1
//             }
//         } else if (this.radius > this.minRadius) {
//             this.radius -= 1
//         }

//         this.draw()
//     }
// }

// const init = () => {
//     circleArray = []
//     for (let i = 0; i < 1000; i++) {
//         const radius = Math.random() * 30 + 1
//         const x = Math.random() * (innerWidth - 2 * radius) + radius
//         const y = Math.random() * (innerHeight - 2 * radius) + radius
//         const dx = (Math.random() - 0.5) * 3
//         const dy = (Math.random() - 0.5) * 3
//         circleArray.push(new Cricle(x, y, dx, dy, radius))
//     }
//     animate()
// }

// const animate = () => {
//     requestAnimationFrame(animate)
//     ctx.clearRect(0, 0, innerWidth, innerHeight)
//     ctx.fillText('HELLO SBBBB!!!!', mouse.x, mouse.y)
//     for (let index = 0; index < circleArray.length; index++) {
//         circleArray[index].update()
//     }
// }

// init()

const Ball: FC = () => {
	const [mouse, setMouse] = useImmer({ x: 0, y: 0 })
	const isDown = useRef(false)
	const canvas = useRef<HTMLCanvasElement>(null)
	const context = useRef<CanvasRenderingContext2D>()

	useEffect(() => {
		init()
		window.addEventListener('resize', onResize)
		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])

	const onResize = () => {
		if (canvas.current) {
			canvas.current.width = innerWidth
			canvas.current.height = innerHeight
		}
	}

	const init = () => {
		if (canvas.current) {
			context.current = canvas.current.getContext('2d') as CanvasRenderingContext2D
			canvas.current.width = innerWidth
			canvas.current.height = innerHeight
		}
	}

	return (
		<Page className={styles.ball}>
			<canvas ref={canvas} />
		</Page>
	)
}

export default Ball
