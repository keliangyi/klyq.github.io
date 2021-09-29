import { FC } from 'react'
import classNames from 'classnames'
import { Icon, Page } from '@/components'
import styles from './grid.less'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<', '+', '-', '=']

const GridCalculator: FC = () => {
	return (
		<Page className={styles.calculator}>
			<div className={styles.screen}>0.00</div>
			<div className={styles.keyboard}>
				<div className={styles.wrapper}>
					{KEYS.map((key) => (
						<div
							className={classNames(styles.key, {
								[styles.dot]: key === '.',
								[styles.plus]: key === '+',
								[styles.minus]: key === '-',
								[styles.submit]: key === '=',
								[styles.backspace]: key === '<',
							})}
							key={key}
						>
							<div>{key === '<' ? <Icon type="icon-backspace" /> : key}</div>
						</div>
					))}
				</div>
			</div>
		</Page>
	)
}

export default GridCalculator
