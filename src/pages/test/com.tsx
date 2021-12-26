import { FC, memo, useState, useCallback, useEffect, useContext } from 'react'
import { useFetch, useImmer } from '@/hooks'
import { Icon, Page, Portal } from '@/components'
import Toast from '@/components/toast'
import { Global } from '@/components/base'

const TestComponent: FC = () => {
	const [state, setState] = useImmer({
		visible: false,
	})

	const { theme, setStore } = useContext(Global)

	const handleContainer = () => {
		const c = Math.random()
		return c > 0.5 ? document.getElementById('root')! : document.querySelector('main')!
	}
	console.log('test  rendered')
	const handleShow = () => {
		// Portal()
		Toast.show()
	}
	return (
		<Page>
			<h1>TestComponent --- {theme}</h1>
			<Icon type="icon-plus" />
			<Toast>this is a message from toast !!!!</Toast>
			<Child />
			<div>
				<button
					onClick={() =>
						setState((draft) => {
							draft.visible = !draft.visible
						})
					}
				>
					click
				</button>
				<button
					style={{ marginLeft: 15 }}
					onClick={() =>
						setStore((draft) => {
							draft.theme = draft.theme === 'light' ? 'dark' : 'light'
						})
					}
				>
					change theme
				</button>

				<button onClick={handleShow}>Portal</button>
			</div>
		</Page>
	)
}

const Child: FC = memo(() => {
	console.log('Child rendered')

	return <b>Child</b>
})

export default TestComponent
