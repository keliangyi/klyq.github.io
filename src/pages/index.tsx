import { Redirect, Link } from 'umi'

import styles from './index.less'

export default function IndexPage() {
	return (
		<div className={styles.home}>
			<Link to="/clock">clock</Link>
			<Link to="/drag">drag</Link>
			<Link to="/drag/sort">sort</Link>
			<Link to="/css/tabbar">tabbar 背景色</Link>
			<Link to="/css/grayscale">grayscale</Link>
			<Link to="/css/gallery">gallery</Link>
		</div>
		// <Redirect to="/clock"/>
	)
}
