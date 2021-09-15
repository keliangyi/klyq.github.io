import { Page } from '@/components'
import styles from './css.less'

const pics = [
	'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600&end=1%27',
	'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600&end=1%27',
	'https://images.pexels.com/photos/913215/pexels-photo-913215.jpeg?auto=compress&cs=tinysrgb&w=600&end=1%27',
]

const AbsoluteMargin = () => {
	return (
		<Page className={styles.AbsoluteMargin}>
			<ul className={styles.wrap}>
				{Array.from(new Array(pics.length).keys()).map((i) => (
					<li className={styles.item}>
						<div className={styles.box}>
							<img src={pics[i]} alt="" />
						</div>
					</li>
				))}
			</ul>
		</Page>
	)
}

export default AbsoluteMargin
