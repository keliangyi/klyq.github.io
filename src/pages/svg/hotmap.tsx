import { FC, useMemo } from 'react'
import { Page } from '@/components'
import { useImmer } from '@/hooks'
import styles from './svg.less'

const oneDay = 24 * 60 * 60 * 1000

const format = (date: Date): string => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const HotMap: FC = () => {
	const [date, setDate] = useImmer(() => {
		const today = new Date()
		return Array.from(new Array(365 + today.getDay()).keys())
			.map((i) => {
				return new Date(today.getTime() - i * oneDay)
			})
			.reverse()
	})

	const dateGroup = useMemo(() => {
		return date.reduce(
			(a, c) => {
				c.getDay() === 0 ? a.push([c]) : a[a.length - 1].push(c)
				return a
			},
			[[]] as Date[][],
		)
	}, [date])

	return (
		<Page className={styles.hotmap}>
			<div className={styles.box}>
				<svg width={24 * dateGroup.length + 20} height={24 * 7 - 4}>
					<g>
						<text x={0} y={38}>
							Mon
						</text>
						<text x={0} y={88}>
							Wed
						</text>
						<text x={0} y={135}>
							Fri
						</text>
					</g>
					{dateGroup.map((week, gid) => {
						return (
							<g key={gid} transform={`translate(${18 + 24 * gid})`}>
								{week.map((day, idx) => (
									<rect
										key={day.getTime()}
										data-level={Math.floor(Math.random() * 3)}
										data-date={format(day)}
										width={20}
										height={20}
										rx={4}
										ry={4}
										x={0}
										y={idx * 24}
									>
										<title>{format(day)}</title>
									</rect>
								))}
							</g>
						)
					})}
				</svg>
			</div>
		</Page>
	)
}

export default HotMap
