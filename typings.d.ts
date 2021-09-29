declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.json'
declare module '*.svg' {
	export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
	const url: string
	export default url
}

declare module 'jshashes'

declare module 'jshashes' {
	const Hashes: any
	export default Hashes
}
