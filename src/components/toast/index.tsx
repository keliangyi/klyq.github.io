import { useInterval } from '@/hooks'
import classNames from 'classnames'
import { FC, memo, useEffect } from 'react'
import { Popup } from '..'
import { IToastProps } from '../@types/toast'
import Base from '../base'
import './toast.less'

const Toast: FC<IToastProps> = memo(({ className, children, ...popup }) => {
	console.log('Toast  rendered')
	return (
		<Popup {...popup}>
			<div className={classNames('toast', className)}>
				<div className="content">{children}</div>
			</div>
		</Popup>
	)
})

export default Base<IToastProps>(Toast)
