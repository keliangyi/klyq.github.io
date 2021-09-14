/**
 * 为对象设置默认值
 * @param obj
 * @param defaultValue
 * @returns
 */
export const setDefaultValue = <T extends Object>(obj: T, defaultValue: any = void 0) =>
	new Proxy(obj, {
		get: (target: T, prop: Extract<keyof T, string>) => target[prop] ?? defaultValue,
	})
/**
 * arr[-1]
 * @param arr
 * @returns
 */
export const getLastItem = (arr: Array<any>) =>
	new Proxy(arr, {
		get: (target, prop: string, self) => Reflect.get(target, +prop < 0 ? String(target.length + +prop) : prop, self),
	})

/**
 * 私有属性和方法
 * @param obj
 * @param prefix
 * @returns
 */
export const hidePrivate = <T extends Object>(obj: T, prefix = '_') =>
	new Proxy(obj, {
		has: (target, prop: string) => !prop.startsWith(prefix) && prop in target,
		ownKeys: (target) => Reflect.ownKeys(target).filter((f) => typeof f !== 'string' || !f.startsWith(prefix)),
		get: (target, prop: Extract<keyof T, string>, self) => (prop in self ? target[prop] : '私有属性不可访问'),
	})
/**
 * 缓存
 * @param obj
 * @param ms
 * @returns
 */
export const cache = <T extends Object>(obj: T, ms = 60) => {
	const create_at = Date.now()
	const isExpired = () => Date.now() - create_at > ms
	return new Proxy(obj, {
		get: (target, prop) => (isExpired() ? '过期了' : Reflect.get(target, prop)),
	})
}

export const range = (min: number, max: number) =>
	new Proxy(Object.create(null), {
		has: (_, prop: string) => +prop >= min && +prop <= max,
	})

export const getCookieObject = (): any => {
	const cookies = document.cookie.split(';').reduce(
		(cks, ck) => ({
			[ck.substring(0, ck.indexOf('=')).trim()]: ck.substring(ck.indexOf('=') + 1),
			...cks,
		}),
		{},
	)
	const setCookie = (name: string, val: string) => (document.cookie = `${name}=${val}`)
	const deleteCookie = (name: string) => (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`)
	return new Proxy(cookies, {
		set: (obj, prop: string, val) => (setCookie(prop, val), Reflect.set(obj, prop, val)),
		deleteProperty: (obj, prop: string) => (deleteCookie(prop), Reflect.deleteProperty(obj, prop)),
	})
}

export const proxyApply = <T extends Function>(fn: T) =>
	new Proxy(fn, {
		apply: (target, ctx, args) => {
			console.log(args)
			if (!args[1]) {
				args[1] = 10
			}
			return Reflect.apply(target, ctx, args)
		},
	})
