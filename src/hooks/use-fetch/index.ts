import { Draft } from 'immer'
import { DependencyList, RefObject, useEffect, useRef } from 'react'
import { useFn, useImmer } from '..'
import { objectToQueryString, throttle } from '@/util/index'

type IParams = Record<string, string | number>
type MyRequestInit = Omit<RequestInit, 'body'> & { body: IParams }

export interface IOptions<R extends any = unknown> extends MyRequestInit {
	loadMore?: boolean
	manual?: boolean
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
	run: (p?: IParams) => Promise<R>
	abort: () => void
}

interface IState<D extends any = unknown> {
	key: number
	page: number
	loading: boolean
	data?: D
	cache?: { [key: string]: any }
	dataList: any[]
}

async function request(url: string, p?: MyRequestInit): Promise<{ data: any; response: Response }> {
	let data
	let { body: bodyObj, method, ...fetchInit } = p as MyRequestInit
	let body: string | undefined = ''
	if (method === 'get') {
		url += objectToQueryString(bodyObj)
		body = void 0
	} else if (!method) {
		if (bodyObj && Object.keys(bodyObj).length > 0) {
			method = 'post'
		}
	}
	const response = await fetch(url, {
		...fetchInit,
		body,
		method,
	})
	if (response.ok) {
		data = await response.json()
	} else {
		throw new Error(response.statusText)
	}
	return { data, response }
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
		body,
		ref,
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
		dataList: [],
	})

	const controller = useRef(new AbortController())

	const abort = useFn(() => {
		controller.current.abort()
		controller.current = new AbortController()
	})

	const run = useFn(async function (params?: IParams) {
		const signal = controller.current.signal
		params = params ?? {}
		setState((draft) => {
			draft.loading = true
			if (loadMore) {
				params!.page = draft.page
				draft.page++
			}
		})
		try {
			let { data } = await request(url, {
				body: Object.assign(body, params),
				signal,
				...fetchInit,
			})
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
				if (loadMore) {
					//@ts-ignore
					draft.data = (draft.data ?? []).concat(data)
				} else {
					draft.data = data
				}
			})
			return data
		} catch (error) {
			console.error(error)
			onError && onError(error)
		} finally {
			setState((draft) => {
				draft.loading = false
			})
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
					if (loadMore && !state.loading) {
						run()
					}
					onBottom && onBottom()
				}
			}
		}, 500),
	)

	useEffect(() => {
		if (ref && ref.current) {
			window.addEventListener('scroll', loadMoreFn)
		}
		return () => {
			window.removeEventListener('scroll', loadMoreFn)
		}
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
