import { useEffect, useRef } from 'react'

const useUpdateEffect: typeof useEffect = (callback, deps) => {
	const mounted = useRef(false)

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true
		} else {
			return callback()
		}
	}, deps)
}

export default useUpdateEffect
