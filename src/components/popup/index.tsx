import { useFn } from '@/hooks'
import classNames from 'classnames'
import { AnimationEvent, FC, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { IPopupProps } from '../@types/popup'
import './popup.less'

const Popup: FC<IPopupProps> = ({ visible, scroll, getContainer, children }) => {
	const once = useRef(true)
	const containerFn = useFn(() => {
		if (getContainer) {
			if (typeof getContainer === 'string') {
				return document.querySelector(getContainer) ?? document.body
			}
			if (typeof getContainer === 'function') {
				const dom = getContainer()
				return dom ?? document.body
			}
		}
		return document.body
	})
	const container = useRef(containerFn())

	const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
		const popup = e.target as HTMLElement
		popup.classList.remove('fadeIn', 'fadeOut')
		if (!visible) {
			popup.classList.add('hide')
		}
	}

	useEffect(() => {
		if (scroll) {
			document.body.style.cssText = visible ? 'overflow:hidden' : ''
		}
		return () => {
			if (scroll) {
				document.body.style.cssText = ''
			}
		}
	}, [visible, scroll])

	const renderPortal = useFn(() => {
		const cls = classNames('popup', {
			fadeIn: visible,
			fadeOut: !visible,
		})

		const content = (
			<div>
				<div className={cls} onAnimationEnd={handleAnimationEnd}>
					{children}
				</div>
			</div>
		)
		return content
	})
	if (once.current && !visible) {
		once.current = false
		return null
	}
	return ReactDOM.createPortal(renderPortal(), container.current)
}

export default Popup
