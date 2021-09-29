import { useEffect, useRef, DependencyList } from 'react'
import { useFn, useUpdateEffect } from '..'

function useRequestAnimationFrame(fn: Function): {
	animate: (...args: any[]) => void
} {
	const requestRef = useRef<number>()

	const animate = useFn((...args: any[]) => {
		fn(...args)
		if (args.length > 1) {
			args.splice(args.length - 1, 1)
		}
		requestRef.current = requestAnimationFrame(animate.bind(null, ...args))
	})

	useEffect(() => {
		// requestRef.current = requestAnimationFrame(animate)
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current)
			}
		}
	}, [])

	return {
		animate,
	}
}

export default useRequestAnimationFrame

// function useRequestAnimationFrame(fn: Function,deps:DependencyList) {
//     const requestRef = useRef<number>();
//     const previousTimeRef = useRef<number>();
//     /**
//      * The callback function is automatically passed a timestamp indicating
//      * the precise time requestAnimationFrame() was called.
//      */

//     useEffect(() => {
//         const animate = (time: number) => {
//             if (previousTimeRef.current !== undefined) {
//                 const deltaTime = time - previousTimeRef.current;
//                 console.log('rendered')
//                 fn(deltaTime);
//             }
//             previousTimeRef.current = time;
//             requestRef.current = requestAnimationFrame(animate);
//         };
//         requestRef.current = requestAnimationFrame(animate);
//         return () => cancelAnimationFrame(requestRef.current!);
//     }, []); // Make sure the effect runs only once
// }
