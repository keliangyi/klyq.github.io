import classNames from 'classnames'
import { FC } from 'react'

import styles from './ytb.less'

const YtbChannelLayout: FC = () => {
	return (
		<div className={styles.ytbChannelLayout}>
			<header className={classNames(styles.header, styles.middle)}>
				<div>header</div>
			</header>
			<aside className={styles.aside}>aside</aside>
			<main className={styles.content}>
				<div className={styles.background}>
					<img src="https://cdn.pixabay.com/index/2022/04/25/12-08-59-434_1920x550.jpg" alt="" />
				</div>
				<div className={styles.channelInfo}>
					<div className={classNames(styles.inner, styles.middle)}>
						<img className={styles.avatar} src="https://raw.githubusercontent.com/klyq/i/main/u/chrome-logo.png" />
						<div className={styles.info}>
							<h3>频道名称</h3>
							<p className={styles.subscriberCount}>43万位订阅者</p>
						</div>
						<div>
							<button className={styles.subscribeBtn}>订阅</button>
						</div>
					</div>
				</div>
				<div className={styles.channelTab}>
					<div className={styles.inner}>
						<ul className={styles.menu}>
							<li className={styles.on}>
								<a href="">首页</a>
							</li>
							<li>
								<a href="">视频</a>
							</li>
							<li>
								<a href="">播放列表</a>
							</li>
							<li>
								<a href="">社区</a>
							</li>
							<li>
								<a href="">频道</a>
							</li>
							<li>
								<a href="">简介</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.channelContent}>
					<div className={styles.inner}>
						<div style={{ height: 2000 }}>
							频道的内容
							<div className={styles.dropShadow}>
								<img src="https://raw.githubusercontent.com/klyq/i/main/u/chrome-logo.png" />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default YtbChannelLayout
