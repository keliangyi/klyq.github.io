import { ConfigProvider } from '@/components/base'
import { FC } from 'react'

const AppLayout: FC = ({ children }) => {
	return (
		<ConfigProvider theme="dark">
			<main>{children}</main>
		</ConfigProvider>
	)
}

export default AppLayout
