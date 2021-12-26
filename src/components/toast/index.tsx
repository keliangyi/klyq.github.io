import { useInterval } from '@/hooks'
import classNames from 'classnames'
import {
	FC,
	memo,
	useEffect,
	useLayoutEffect,
	forwardRef,
	useImperativeHandle,
	useRef,
	ForwardRefRenderFunction,
	Component,
	Ref,
	createRef,
} from 'react'
import { Popup, Portal } from '..'
import { IToastProps } from '../@types/toast'
import Base from '../base'
import './toast.less'

interface IRef {
	addMessage: () => void
}

const CToast = forwardRef<IRef, IToastProps>(({ className, children, visible, ...popup }, ref) => {
	useLayoutEffect(() => {
		if (!visible) {
			console.log('d')
		}
	}, [visible])

	useImperativeHandle(ref, () => ({
		addMessage() {
			alert(1)
			//   setToasts([...toasts, { ...toast, id: uuid() }]);
		},
	}))

	return (
		<Portal>
			<div className={classNames('toast', className)}>
				<div className="content">{children}</div>
			</div>
		</Portal>
	)
})

class Toast extends Component {
	static ref = createRef<IRef>()

	static show() {
		Toast.ref.current?.addMessage()
	}

	render() {
		return <CToast ref={Toast.ref} {...this.props} />
	}
}

// export default Base<IToastProps>(Toast)
export default Toast
