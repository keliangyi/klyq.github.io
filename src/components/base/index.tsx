import { useImmer } from '@/hooks'
import { Updater } from '@/hooks/use-immer'
import classNames from 'classnames'
import { FC, useContext, createContext } from 'react'
import { IBase } from '../@types'

interface IConfig {
	perfix: string
	theme: 'light' | 'dark'
}

const defaultConfig: IConfig = {
	perfix: 'c',
	theme: 'light',
}

export const Global = createContext<IConfig & { setStore: Updater<IConfig> }>({
	...defaultConfig,
	setStore: () => {},
})

export const ConfigProvider: FC<Partial<IConfig>> = ({ children, ...customConfig }) => {
	const [store, setStore] = useImmer({
		...defaultConfig,
		...customConfig,
	})
	return (
		<Global.Provider
			value={{
				...store,
				setStore,
			}}
		>
			{children}
		</Global.Provider>
	)
}

const Base = <T extends IBase = IBase>(Component: React.ComponentType<T>) => {
	const Wrapper: FC<T> = (props) => {
		const { perfix } = useContext(Global)
		return <Component {...(props as T)} className={props.className} style={props.style} perfix={perfix} />
	}
	return Wrapper
}

export default Base
