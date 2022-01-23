import React from 'react'
import { Page } from '@/components'

import styles from './css.less'

const Flex: React.FC = () => {
	return (
		<Page>
			{/* <ul className={styles.container}>
				<li>1</li>
				<li>2 Lorem ipsum dolor sit amet consectetur.</li>
				<li>3 Lorem, ipsum dolor.</li>
				<li>4</li>
				<li>5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ea.</li>
				<li>6</li>
			</ul> */}

			<div className={styles.figure}>
				{Array.from(Array(6).keys()).map((i) => (
					<figure key={i}>
						<div></div>
						<figcaption>【{i}】Lorem ipsum dolor sit amet.</figcaption>
					</figure>
				))}
			</div>

			<div className={styles.rootFlow}>
				<div>
					<div className={styles.flow}>
						<div className={styles.pullLeft}>display: flow-root;</div>
						<div className={styles.pullRight}>父级高度不会塌陷</div>
					</div>
				</div>
				<div>
					<div className={styles.block}>
						<div className={styles.pullLeft}>display:block;</div>
						<div className={styles.pullRight}>不清除浮动就会塌陷</div>
					</div>
				</div>
			</div>
		</Page>
	)
}

export default Flex
