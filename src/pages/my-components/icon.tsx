import { FC } from 'react'
import { Icon, Page } from '@/components'
import styles from './components.less'

const DEFAULTICONS = [
	'icon-backspace',
	'icon-back',
	'icon-minus-circle',
	'icon-question-circle',
	'icon-delete',
	'icon-edit',
	'icon-right',
	'icon-arrowup',
	'icon-exclaimination',
	'icon-check',
	'icon-close',
	'icon-caret-down',
	'icon-pubuliu',
	'icon-layout-f',
]

const CompoentIcon: FC = () => {
	return (
		<Page className={styles.myIcon}>
			<ul className={styles.grid}>
				{DEFAULTICONS.map((i) => (
					<li key={i} className={styles.item}>
						<Icon type={i} />
					</li>
				))}
			</ul>
		</Page>
	)
}

export default CompoentIcon
