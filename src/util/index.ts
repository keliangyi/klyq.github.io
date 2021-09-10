export const debounce = (fn: Function, ms = 0) => {
	let timeoutId: ReturnType<typeof setTimeout>
	return function (this: unknown, ...args: any[]) {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => fn.apply(this, args), ms)
	}
}

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
