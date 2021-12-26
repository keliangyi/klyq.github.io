import { FC, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

export interface Iprops {
	el?: Element
	className?: string
}

const portalId = '_portal'

const remove = () => {
	const p = document.querySelector(`#${portalId}`)

	if (p) {
		console.log(p, '===')
		document.body.removeChild(p)
	}
}

const Portal: FC<{ el?: Element }> = ({ children, el }) => {
	return ReactDOM.createPortal(<div>{children}</div>, el || document.body)
}

export default Portal
