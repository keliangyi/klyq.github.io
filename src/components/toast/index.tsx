import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { Popup } from '..'
import { IToastProps } from '../@types/toast'
import './toast.less'

const Toast: FC<IToastProps> & { show: () => any } = ({ className, children, ...popup }) => {
	useEffect(() => {
		// Toast.show()
	}, [popup.visible])
	return (
		<Popup {...popup}>
			<div className={classNames('toast', className)}>
				<div className="content">{children}</div>
			</div>
		</Popup>
	)
}
Toast.show = function () {}

export default Toast
