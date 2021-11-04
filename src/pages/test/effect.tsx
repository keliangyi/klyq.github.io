import { useEffect, useState } from 'react'

function Counter() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		console.log(2)
	}, [])

	useEffect(() => {
		console.log(1)
		return () => {
			console.log('cleanup')
		}
	})

	function handleAlertClick() {
		setTimeout(() => {
			alert('You clicked on: ' + count)
		}, 3000)
	}

	console.log('render')

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
			<button onClick={handleAlertClick}>Show alert</button>
		</div>
	)
}

export default Counter
