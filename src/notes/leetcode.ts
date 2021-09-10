/**
 * 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * @param s
 * @returns
 */
export const isValid = (s: string): boolean => {
	const len = s.length
	if (len % 2 !== 0) {
		return false
	}
	const arr: string[] = []

	for (const current of s) {
		switch (current) {
			case '(':
				arr.push(')')
				break
			case '[':
				arr.push(']')
				break
			case '{':
				arr.push('}')
				break
			default:
				if (current !== arr.pop()) {
					return false
				}
		}
	}
	return arr.length === 0
}

/**
 *  罗马数字转整数
 * @param s
 */
function romanToInt(s: string): number {
	return 0
}
