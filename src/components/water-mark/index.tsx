import React, { CSSProperties, useCallback, useEffect, useRef } from 'react'

export interface WaterMarkProps {
	text?: string | string[]
	opacity?: number
	rotate?: number
	scale?: number
	fontWeight?: CSSProperties['fontWeight']
	fontSize?: number
	fontFamily?: string
	color?: string
	zIndex?: number
}

const getHeight = (deg: number, long: number, fs: number, rows: number): number => {
	if (!deg) {
		return fs + 10
	}
	const radian = deg * (Math.PI / 180)
	const c = Math.sqrt(Math.pow(long, 2) * 2 - 2 * Math.pow(long, 2) * Math.cos(radian))
	return c + fs * rows + 10
}

const WaterMark: React.FC<WaterMarkProps> = ({ children, zIndex, ...props }) => {
	const ref = useRef<HTMLDivElement>(null)

	const drawCanvas = useCallback<(p: Required<WaterMarkProps>) => any>((args) => {
		const dpr = window.devicePixelRatio ? Math.round(window.devicePixelRatio) : 1
		const canvas = document.createElement('canvas')

		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
		const font = `normal ${args.fontWeight} ${args.fontSize}px ${args.fontFamily}`
		ctx.scale(dpr, dpr)

		ctx.font = font

		const textArr = Array.isArray(args.text) ? args.text : [args.text]
		const textWidth = ctx.measureText(textArr.reduce((a, c) => (a.length > c.length ? a : c))).width

		let x = textWidth / 2

		const height = getHeight(args.rotate, textWidth, args.fontSize, textArr.length)

		let y = height / 2

		canvas.width = textWidth * args.scale
		canvas.height = y * 2 * args.scale

		ctx.font = font
		ctx.textAlign = 'center'
		ctx.globalAlpha = args.opacity
		ctx.fillStyle = args.color

		ctx.translate(x, y)
		ctx.rotate(args.rotate * (Math.PI / 180))
		ctx.translate(-x, -y)

		textArr.forEach((text, idx) => {
			ctx.fillText(text, x, y + args.fontSize * idx)
		})

		// document.body.appendChild(canvas)
		return ctx.canvas.toDataURL()
	}, [])

	useEffect(() => {
		init()
		const observer = new MutationObserver(function (mutationsList, observer) {
			mutationsList.forEach((i) => {
				const wmk = ref.current?.querySelector('.wmk')
				if (i.target === wmk || !wmk) {
					init()
					if (wmk) {
						ref.current?.removeChild(wmk)
					}
				}
			})
		})
		observer.observe(ref.current!, { childList: true, attributes: true, subtree: true })
		return () => {
			observer.disconnect()
		}
	}, [])

	const init = () => {
		if (!props.text) {
			props.text = ''
		}
		const bg = drawCanvas(props as Required<WaterMarkProps>)
		const div = document.createElement('div')
		div.classList.add('wmk')
		div.style.cssText = `
			position: absolute;
			inset:0;
			pointer-events: none;
			background-image:url(${bg});
			background-repeat: 'repeat';
			z-index:${zIndex}
		`
		ref.current?.appendChild(div)
	}

	return (
		<div style={{ position: 'relative' }} ref={ref}>
			{children}
		</div>
	)
}

WaterMark.defaultProps = {
	opacity: 0.2,
	scale: 1.5,
	rotate: 20,
	color: 'red',
	fontSize: 16,
	fontWeight: 'normal',
	zIndex: 1040,
}

export default WaterMark
