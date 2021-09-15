import classNames from 'classnames'
import { FC, FunctionComponent } from 'react'
import { IconProps } from '../@types'
import './icon.less'

const scripts = new Set<string>()

const iconCreator = (url: string): FC<IconProps> => {
	if (!scripts.has(url)) {
		const script = document.createElement('script')
		script.setAttribute('src', url)
		script.setAttribute('data-namespace', url)
		scripts.add(url)
		document.body.appendChild(script)
	}

	const Icon: FC<IconProps> = ({ type, className, ...props }) => {
		Icon.displayName = 'Iconfont'
		return (
			<i className={classNames('c-icon', className)} {...props}>
				<svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
					<use xlinkHref={`#${type}`} />
				</svg>
			</i>
		)
	}

	return Icon
}

const Icon = iconCreator('//at.alicdn.com/t/font_2808707_2qg8we6vbky.js')

export default Icon
