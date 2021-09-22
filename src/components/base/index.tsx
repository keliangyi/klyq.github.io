import classNames from 'classnames'
import { FC, useContext, createContext } from 'react'
import { IBase } from '../@types'

const config = createContext({
	perfix: 'cccc',
})

const Base = (Component: any) => {
	const Wrapper: FC<IBase> = (props) => {
		const { perfix } = useContext(config)
		return <Component {...props} className={props.className} style={props.style} perfix={perfix} />
	}
	return Wrapper
}

export default Base
