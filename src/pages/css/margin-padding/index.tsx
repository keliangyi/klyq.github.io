import { FC } from 'react'
import styles from './mp.less'

const MarginAndPadding: FC = () => {
	return (
		<div>
			<div className={styles.section}>
				{Array.from(new Array(45).keys()).map((i) => (
					<div className={styles.box} key={i}>
						<span>{i}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default MarginAndPadding
