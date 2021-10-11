import { FC, useMemo, ChangeEvent, useEffect } from 'react'
import { Page } from '@/components'
import { useImmer } from '@/hooks'
import styles from './svg.less'

const zhouchang = (radius: number): number => 2 * Math.PI * radius

const RADIUS = 140

const Progress: FC = () => {
	const [progress, setProgess] = useImmer(43.96)

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		if (progress < 100) {
	// 			let c = progress + 1
	// 			if (c > 100) {
	// 				c = 100
	// 			}
	// 			setProgess(parseFloat(c.toFixed(2)))
	// 		} else {
	// 			clearInterval(timer)
	// 		}
	// 	}, 10)
	// 	return () => {
	// 		clearInterval(timer)
	// 	}
	// }, [progress])

	const offset = useMemo(() => {
		const c = zhouchang(RADIUS)
		const pct = ((100 - progress) / 100) * c
		return pct
	}, [progress])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setProgess(e.target.valueAsNumber)
	}

	return (
		<Page className="examplePage">
			<div className="container">
				<div className={styles.progressBar}>
					<svg width={300} height={300}>
						<circle
							id="bg"
							cx="150"
							cy="150"
							r={RADIUS}
							strokeDasharray={zhouchang(RADIUS)}
							stroke="#fdeff1"
							fill="transparent"
							strokeWidth="10"
						/>
						<circle
							transform="rotate(-90,150,150)"
							id="currtent"
							cx="150"
							cy="150"
							r={RADIUS}
							strokeDasharray={zhouchang(RADIUS)}
							strokeDashoffset={offset}
							stroke="#ea557a"
							fill="transparent"
							strokeWidth="20"
						/>
						<text x={150} y={150} transform="translate(-15,10)">
							{progress}%
						</text>
					</svg>
					<div className={styles.control}>
						<input step={0.01} type="range" value={progress} onChange={handleChange} max={100} min={0} />
					</div>
				</div>
			</div>
		</Page>
	)
}

export default Progress
