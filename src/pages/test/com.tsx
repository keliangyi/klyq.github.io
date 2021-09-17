import { FC, memo, useState, useCallback, useEffect } from 'react'
import { useFetch, useImmer } from '@/hooks'
import { Page, Popup } from '@/components'
import Toast from '@/components/toast'

const TestComponent: FC = () => {
	const [state, setState] = useImmer({
		visible: false,
	})

	useEffect(() => {}, [])

	const handleContainer = () => {
		const c = Math.random()
		return c > 0.5 ? document.getElementById('root')! : document.querySelector('main')!
	}

	return (
		<Page>
			<h1>TestComponent</h1>
			<Toast visible={state.visible}>this is a message from toast !!!!</Toast>
			<button
				onClick={() =>
					setState((draft) => {
						draft.visible = !draft.visible
					})
				}
			>
				click
			</button>
		</Page>
	)
}

export default TestComponent
