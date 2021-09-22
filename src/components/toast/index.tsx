import { useInterval } from '@/hooks'
import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { Popup } from '..'
import { IToastProps } from '../@types/toast'
import Base from '../base'
import './toast.less'

const Toast: FC<IToastProps> = ({ className, children, ...popup }) => {
	return (
		<Popup {...popup}>
			<div className={classNames('toast', className)}>
				<div className="content">{children}</div>
			</div>
		</Popup>
	)
}

export default Base(Toast)
