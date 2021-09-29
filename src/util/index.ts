export const copyText = (txt: string, onSuccess?: () => void) => {
	if (txt === '') {
		return
	}
	const input = document.createElement('input')
	input.setAttribute('readonly', 'readonly')
	input.setAttribute('value', txt)
	document.body.appendChild(input)
	input.setSelectionRange(0, 9999)
	input.select()
	if (document.execCommand('copy')) {
		document.execCommand('copy')
		onSuccess && onSuccess()
	}
	document.body.removeChild(input)
}

export const objectToQueryString = (params?: Record<string, string | number>): string => {
	if (!params) return ''
	return Object.entries(params!).reduce((queryString, [key, val]) => {
		const symbol = queryString.length === 0 ? '?' : '&'
		queryString += ['string', 'number'].includes(typeof val) ? `${symbol}${key}=${val}` : ''
		return queryString
	}, '')
}

export const debounce = (fn: Function, ms = 0) => {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (this: unknown, ...args: any[]) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn.apply(this, args), ms)
	}
}

export const throttle = (fn: Function, wait: number) => {
	let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number
	return function (this: unknown) {
		const self = this,
			args = arguments
		if (!inThrottle) {
			fn.apply(self, args)
			lastTime = Date.now()
			inThrottle = true
		} else {
			clearTimeout(lastFn)
			lastFn = setTimeout(function () {
				if (Date.now() - lastTime >= wait) {
					fn.apply(self, args)
					lastTime = Date.now()
				}
			}, Math.max(wait - (Date.now() - lastTime), 0))
		}
	}
}

export const betweenRandom = (min: number, max: number) => {
	return Math.random() * (max - min) + min
}
