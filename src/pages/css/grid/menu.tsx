import React, { FC, useState } from 'react'
import { Link } from 'umi'
import classNames from 'classnames'
import { Page } from '@/components'
import styles from './grid.less'

const menus = [
	{ title: '-' },
	{ title: 'close' },
	{ title: 'home' },
	{ title: 'Node' },
	{ title: 'Vue' },
	{ title: 'React' },
	{ title: 'CSS' },
	{ title: 'JavaScript' },
]

const GridMenu: FC = () => {
	const [on, setOn] = useState(true)
	const handleToggle = () => {
		setOn(!on)
	}
	return (
		<Page title="GridMenu">
			<section className={styles.menu}>
				<button onClick={handleToggle} style={{ margin: '50px' }}>
					展开菜单
				</button>
				<nav>
					<ul
						className={classNames(styles.nav, {
							[styles.on]: on,
						})}
					>
						{menus.map((i) => {
							return (
								<li key={i.title}>
									<a onClick={handleToggle}>{i.title === '-' ? null : i.title}</a>
								</li>
							)
						})}
					</ul>
				</nav>
			</section>
		</Page>
	)
}

export default GridMenu
