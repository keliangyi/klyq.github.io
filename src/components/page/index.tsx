import { FC } from 'react'
import { IPageProps } from '../@types'
import Base from '../base'

const Page: FC<IPageProps> = ({ children, perfix, title, ...rest }) => {
	return <section {...rest}>{children}</section>
}

export default Base(Page)
