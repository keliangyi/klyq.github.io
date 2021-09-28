import { useImmer } from '@/hooks'
import { FC, CanvasHTMLAttributes, useEffect, useRef } from 'react'
import { IBase } from '../@types'
import Base from '../base'

export type ISize = Partial<{ width: number | string; height: number | string }>

interface CanvasProps extends IBase, Omit<CanvasHTMLAttributes<HTMLCanvasElement>, 'className' | 'style'> {
	resize?: boolean
	onMount?: (ctx: CanvasRenderingContext2D) => void
}

const Canvas: FC<CanvasProps> = ({ resize, perfix, width, height, onMount, ...rest }) => {
	const mounted = useRef(false)
	const ref = useRef<HTMLCanvasElement>(null)
	// const context = useRef<CanvasRenderingContext2D>()

	const [size, setSize] = useImmer({
		width,
		height,
	})

	const onResize = () => {
		setSize({
			width: innerWidth,
			height: innerHeight,
		})
	}

	useEffect(() => {
		if (ref.current) {
			const ctx = ref.current.getContext('2d') as CanvasRenderingContext2D
			onMount && onMount(ctx)
		}
	}, [])

	useEffect(() => {
		if (resize) {
			if (!mounted.current) {
				onResize()
				mounted.current = true
			}
			window.addEventListener('resize', onResize)
			return () => {
				window.removeEventListener('resize', onResize)
			}
		}
	}, [resize])

	return <canvas {...rest} {...size} ref={ref} />
}

export default Base(Canvas)
