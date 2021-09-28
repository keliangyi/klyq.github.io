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
		return Array.from(new Array(365).keys())
			.reverse()
			.map((i) => {
				return new Date(today.getTime() - i * oneDay)
			})
	})

	const dateGroup = useMemo(() => {
		return date.reduceRight((a, c, idx) => {
			const key = Math.floor((idx + 2) / 7)
			return {
				...a,
				[key]: (a[key] || []).concat(c),
			}
		}, {} as { [key: number]: Date[] })
	}, [date])

	return (
		<Page className={styles.hotmap}>
			<div className={styles.box}>
				<svg width={24 * Object.entries(dateGroup).length} height={24 * 7 - 4}>
					{Object.entries(dateGroup).map(([week, val]) => {
						return (
							<g key={week} transform={`translate(${24 * Number(week)})`}>
								{val.map((day, idx) => (
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
