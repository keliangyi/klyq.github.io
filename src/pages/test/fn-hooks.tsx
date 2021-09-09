import { FC, memo, useState, useCallback } from 'react'
import { useFn } from '@/hooks'
import { Page } from '@/components'

const HookChild: FC<{ showMsg: () => void }> = memo(({ showMsg }) => {
	console.log('HookChild rendered')
	return (
		<div>
			<p>HookChild</p>
			<button onClick={showMsg}>showMsg</button>
		</div>
	)
})

const TestFnHooks: FC = () => {
	const [msg, setMsg] = useState<string>(`current number is:${Math.random()}`)

	const handleChangeMsg = () => {
		setMsg(`current number is:${Math.random()}`)
	}

	const handleShowMsg = useCallback(() => {
		// 每次setMsg， HookChild都会render
		alert(msg)
	}, [msg])

	const showMsgFn = useFn(() => {
		alert(msg)
	})

	console.log('TestFnHooks rendered')

	return (
		<Page>
			<p>TestFnHooks</p>
			<p>{msg}</p>
			<button onClick={handleChangeMsg}>change msg</button>
			<HookChild showMsg={showMsgFn} />
		</Page>
	)
}

export default TestFnHooks
