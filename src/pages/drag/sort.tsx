import { useFn, useImmer } from '@/hooks'
import { debounce } from '@/util'
import classNames from 'classnames'
import React, { FC, DragEvent, useState, useEffect, useRef } from 'react'
import styles from './drag.less'

interface SortableProps<T = any> {
	list: T[]
	renderItem: (item: T, idx: number) => React.ReactNode
}

const Sortable: FC<SortableProps> = ({ list, renderItem }) => {
	const [data, setData] = useImmer(list)
	const [dragIndex, setDragIndex] = useImmer<number>(-1)

	useEffect(() => {
		setData(list)
	}, [list])

	const handleDrop = useFn((e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
	})

	const handleDragStart = (idx: number) => {
		setDragIndex(idx)
	}
	const handleDragEnd = () => {
		setDragIndex(-1)
	}
	const handleDragOver = debounce((e: DragEvent<HTMLDivElement>, overIndex: number) => {
		e.preventDefault()
		setData((draft) => {
			draft.splice(overIndex, 0, draft.splice(dragIndex, 1)[0])
		})
	}, 100)

	return (
		<div className={classNames(styles.Sortable)}>
			{data.map((i, idx) => (
				<div
					key={idx}
					className={classNames(styles.item, styles.animate)}
					draggable
					// style={{ opacity: dragIndex === idx ? 0 : 1 }}
					onDragStart={() => handleDragStart(idx)}
					onDragEnd={handleDragEnd}
					onDrop={(e) => handleDrop(e)}
					onDragOver={(e) => handleDragOver(e, idx)}
				>
					{renderItem(i, idx)}
				</div>
			))}
		</div>
	)
}

const Sort: FC = () => {
	const data = ['angel-1', 'clown-2', 'mandarin-3', 'sturgeon-4', 'angel-5', 'clown-6', 'mandarin-7', 'sturgeon-8']

	return (
		<div>
			<Sortable
				list={data}
				renderItem={(i, idx) => {
					return <div key={i}>{i}</div>
				}}
			/>
		</div>
	)
}

export default Sort
