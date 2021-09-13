import { Draft } from 'immer'
import { DependencyList, RefObject, useEffect, useRef } from 'react'
import { useFn, useImmer } from '..'
import { objectToQueryString, throttle } from '@/util/index'

export interface IOptions<R extends any = unknown> extends Omit<RequestInit, 'body'> {
	loadMore?: boolean
	manual?: boolean
	body?: Record<string, string | number>
	ref?: RefObject<HTMLElement>
	formatResult?: (res: any) => R
	throwErrorWhen?: (res: any) => boolean
	onSuccess?: (data: R) => void
	onBottom?: () => void
	onError?: (error: unknown) => void
}

export interface IResult<R extends any = unknown> {
	data: R
	loading?: boolean
	run: (p?: Record<string, string | number>) => Promise<R>
	abort: () => void
}

interface IState<D extends any = unknown> {
	key: number
	page: number
	loading: boolean
	data?: D
}

function useFetch<T extends any = any>(url: string): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions): IResult<T>
function useFetch<T extends any = any>(url: string, deps?: DependencyList): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions, deps?: DependencyList): IResult<T>
function useFetch<T extends any = any>(url: string, options?: IOptions | DependencyList, deps: DependencyList = []): IResult<T> {
	const isDeps = Array.isArray(options)
	let {
		loadMore = false,
		manual = false,
		body: _body = {},
		ref,
		method,
		formatResult,
		throwErrorWhen,
		onError,
		onSuccess,
		onBottom,
		...fetchInit
	} = (isDeps ? {} : options) as IOptions
	deps = isDeps ? options : deps

	const [state, setState] = useImmer<IState<T>>({
		loading: false,
		page: 1,
		key: 0,
	})

	const controller = useRef(new AbortController())

	const abort = useFn(() => {
		controller.current.abort()
		controller.current = new AbortController()
	})

	const run = useFn(async (params?: Record<string, string | number>) => {
		let data: unknown
		setState((draft) => {
			draft.loading = true
			draft.page++
		})
		try {
			const signal = controller.current.signal

			if (loadMore) {
				_body.page = state.page
			}
			let body: string | undefined = JSON.stringify(_body)
			if (method === 'get') {
				url += objectToQueryString(_body)
				body = void 0
			} else if (!method) {
				if (_body && Object.keys(_body).length > 0) {
					method = 'post'
				}
			}
			const response = await fetch(url, Object.assign(fetchInit, { signal, body, method }))
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

	const loadMoreFn = useFn(
		throttle(async () => {
			if (ref && ref.current) {
				const dom = ref!.current as HTMLElement
				const lastChild = dom?.lastChild as HTMLElement
				if (lastChild && lastChild.getBoundingClientRect().top < window.innerHeight) {
					if (loadMore && !state.loading && state.key === 0) {
						run()
						console.log(4878)
						setState((draft) => {
							draft.key = 100
						})
					}
					onBottom && onBottom()
				}
			}
		}, 500),
	)

	useEffect(() => {
		if (ref && ref.current) {
			document.addEventListener('scroll', loadMoreFn)
		}
		return () => {}
	}, [ref, loadMore])

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
