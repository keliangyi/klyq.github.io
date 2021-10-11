import { FC, useState, CSSProperties } from 'react'
import { Page } from '@/components'
import styles from './css.less'

const Filter: FC = () => {
	const [state, setState] = useState(50)
	return (
		<Page className="examplePage">
			<div className="container">
				<div className={styles.img} style={{ '--slide': state / 100 } as CSSProperties}>
					<img src="https://cdn.pixabay.com/photo/2017/12/29/18/47/mountains-3048299_960_720.jpg" alt="" />
					<input
						type="range"
						min={1}
						max={100}
						step={0.001}
						className={styles.slider}
						value={state}
						onChange={(e) => setState(e.target.valueAsNumber)}
					/>
				</div>
			</div>
		</Page>
	)
}

export default Filter
