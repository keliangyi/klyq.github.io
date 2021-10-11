import { FC } from 'react'
import classNames from 'classnames'
import { Page } from '@/components'
import styles from '../css.less'

const Border: FC = () => {
	return (
		<Page className="examplePage">
			<div className={classNames(styles.borderRadius, 'container')}>
				<div className={styles.card}>
					<div className={styles.waves}>
						<div className={styles.wave}></div>
						<div className={styles.wave}></div>
						<div className={styles.wave}></div>
						<div className={styles.wave}></div>
						<div className={styles.wave}></div>
					</div>
				</div>
			</div>
		</Page>
	)
}

export default Border
