import { useCallback, useRef } from 'react'

type Ifn = (...args: any[]) => any

const useFn = <T extends Ifn>(fn: T) => {
	const fnRef = useRef<T>(fn)
	fnRef.current = fn
	return useCallback<T>(((...args) => fnRef.current(...args)) as T, [fnRef])
}

export default useFn

/**
 * ahooks
 * https://github.com/alibaba/hooks/blob/master/packages/hooks/src/usePersistFn/index.ts
 */

// import { useRef } from 'react'

// export type noop = (...args: any[]) => any

// function usePersistFn<T extends noop>(fn: T) {
// 	const fnRef = useRef<T>(fn)
// 	fnRef.current = fn

// 	const persistFn = useRef<T>()
// 	if (!persistFn.current) {
// 		persistFn.current = function (this: unknown, ...args) {
// 			return fnRef.current!.apply(this, args)
// 		} as T
// 	}

// 	return persistFn.current!
// }

// export default usePersistFn
