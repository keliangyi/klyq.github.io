import { FC, memo, useState, useCallback, useEffect } from 'react'
import { useFetch } from '@/hooks'
import { Page } from '@/components'

const TestUesFetch: FC = () => {
	const { data, loading, run, abort } = useFetch<any[]>('/api/fun/getmenu', {
		manual: true,
		throwErrorWhen(data) {
			return data.code !== 0
		},
	})

	const fs = async () => {
		const res = await run()
		console.log(res, 'fs')
	}

	return (
		<Page>
			<p>TestUesFetch</p>

			<button onClick={fs}>{loading ? 'loading...' : 'click'}</button>
			<button style={{ marginLeft: 12 }} onClick={abort}>
				abort
			</button>
		</Page>
	)
}

export default TestUesFetch
