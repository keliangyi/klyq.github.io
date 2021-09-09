import { FC } from 'react'
import classNames from 'classnames'
import { IPageProps } from '../@types'
import './page.less'

const Page: FC<IPageProps> = ({ children, className, style }) => {
	return (
		<section className={classNames('page', className)} style={style}>
			{children}
		</section>
	)
}

export default Page
