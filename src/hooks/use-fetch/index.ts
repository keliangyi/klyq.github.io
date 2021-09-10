import { Draft } from 'immer'
import { DependencyList, useEffect, useRef } from 'react'
import { useFn, useImmer } from '..'

export interface IOptions<R extends any = unknown> extends RequestInit {
	loadMore?: boolean
	manual?: boolean
	formatResult?: (res: any) => R
	throwErrorWhen?: (res: any) => boolean
	onSuccess?: (data: R) => void
	onError?: (error: unknown) => void
}

export interface IResult<R extends any = unknown> {
	data: R
	loading?: boolean
	run: () => Promise<R>
	abort: () => void
}

interface IState<D extends any = unknown> {
	key: number
	loading: boolean
	data?: D
}

function useFetch<T extends any = any>(url: string): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions): IResult<T>
function useFetch<T extends any = any>(url: string, deps?: DependencyList): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions, deps?: DependencyList): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions | DependencyList, deps: DependencyList = []): IResult<T> {
	const isDeps = Array.isArray(options)
	const { loadMore = false, manual = false, formatResult, throwErrorWhen, onError, onSuccess, ...fetchInit } = (isDeps ? {} : options) as IOptions
	deps = isDeps ? options : deps

	const [state, setState] = useImmer<IState<T>>({
		loading: false,
		key: 0,
	})

	const controller = useRef(new AbortController())

	const abort = useFn(() => {
		controller.current.abort()
		controller.current = new AbortController()
	})

	const run = useFn(async () => {
		let data: unknown
		setState((draft) => {
			draft.loading = true
		})

		try {
			const signal = controller.current.signal
			const response = await fetch(
				url,
				Object.assign(fetchInit, {
					signal,
				}),
			)
			data = await response.json()
			if (throwErrorWhen && throwErrorWhen(data)) {
				throw new Error('用户自定义的错误')
			}
			if (formatResult) {
				data = formatResult(data)
			}
			if (onSuccess) {
				onSuccess(data)
			}
			setState((draft) => {
				draft.data = data as Draft<T>
			})
		} catch (error) {
			console.log(error)
			onError && onError(error)
		} finally {
			setState((draft) => {
				draft.loading = false
			})
			console.log('finally')
			return data ?? state.data
		}
	})

	useEffect(() => {
		if (!manual) {
			run()
		}
	}, deps)

	return {
		run,
		abort,
		data: state.data,
		loading: state.loading,
	} as IResult<T>
}

export default useFetch

function padding(all: number): void
function padding(topAndBottom: number, leftAndRight: number): void
function padding(top: number, right: number, bottom: number, left: number): void
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number): void {
	if (b === undefined && c === undefined && d === undefined) {
		b = c = d = a
	} else if (c === undefined && d === undefined) {
		c = a
		d = b
	}
	console.log({
		top: a,
		right: b,
		bottom: c,
		left: d,
	})
}
