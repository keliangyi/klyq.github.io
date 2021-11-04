import { Component, useState, useEffect, FC } from 'react'

type IProps = { id: number }
/**
 * class 组件的竞态
 * /api/test/jingtai 当 id === 1 时会 sleep(3)
 *
 * Classes 的 prop.id 先是 1 再是 2
 * 按正常来说 最后改用 id = 2 的结果
 * 但是 id = 1 返回结果会比 id = 2 慢，虽然是先请求的
 * 因此 1 的结果 将会比 2 的结果晚来，将会覆盖 2 【正确】的结果
 */
class Classes extends Component<IProps> {
	state = {
		id: '',
	}

	async fetchData(id: number) {
		const response = await fetch('http://192.168.1.250:9098/api/test/jingtai?id=' + id)
		const result = await response.json()
		this.setState({
			id: result.data,
		})
	}

	componentDidMount() {
		this.fetchData(this.props.id)
	}

	componentDidUpdate(prevProps: IProps) {
		if (prevProps.id !== this.props.id) {
			this.fetchData(this.props.id)
		}
	}

	render() {
		return <h1>{this.state.id}</h1>
	}
}
/**
 * 函数组件
 * @param param0
 * @returns
 */
const Fnc: FC<IProps> = ({ id }) => {
	const [state, setState] = useState<number | null>(null)

	useEffect(() => {
		let didCancel = false
		async function fetchData() {
			const response = await fetch('http://192.168.1.250:9098/api/test/jingtai?id=' + id)
			const result = await response.json()
			if (!didCancel) {
				setState(result.data)
			}
		}
		fetchData()
		return () => {
			didCancel = true
		}
	}, [id])
	return <h1>{state}</h1>
}

const Jingtai = () => {
	const [id, setId] = useState(1)

	useEffect(() => {
		setTimeout(() => {
			setId((c) => c + 1)
		}, 1000)
	}, [])

	return (
		<>
			class :<Classes id={id} />
			<hr />
			functional :<Fnc id={id} />
		</>
	)
}

export default Jingtai
