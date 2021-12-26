import React, { FC, useMemo, TouchEvent, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { Page } from '@/components'
import { useImmer } from '@/hooks'
import styles from './drag.less'
import { shuffle } from '@/helper'

const Stick: FC = () => {
	const ref = useRef<HTMLUListElement>(null)

	const [chars, setChars] = useImmer({
		idioms: ['霸陵醉尉', '死灰复燃', '上蔡苍鹰', '高山景行', '管窥蠡测'],
	})
	const [pos, setPos] = useImmer({
		dx: 0,
		dy: 0,
		startX: 0,
		startY: 0,
		blanks: [] as DOMRect[],
	})

	const idioms = useMemo(() => {
		return chars.idioms.reduce((a, c) => a.concat(c.split('')), [] as string[]).sort(() => (Math.random() > 0.5 ? -1 : 1))
	}, [chars.idioms])

	useEffect(() => {
		if (ref.current) {
			setPos((pos) => {
				pos.blanks = Array.from(ref.current!.querySelectorAll('.blank')).map((i) => i.getBoundingClientRect())
			})
		}
	}, [ref])

	const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const rect = target.getBoundingClientRect()
		console.log(rect)

		const dx = e.touches[0].clientX - rect.x
		const dy = e.touches[0].clientY - rect.y

		setPos((pos) => {
			pos.dx = dx
			pos.dy = dy
			pos.startX = rect.x
			pos.startY = rect.y
		})
	}

	const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const x = e.touches[0].clientX - pos.startX - pos.dx
		const y = e.touches[0].clientY - pos.startY - pos.dy
		move(target, { x, y })
	}
	const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement
		const rect = target.getBoundingClientRect()
		const { blanks } = pos

		// console.log(blanks,rect,pos);

		for (const i in blanks) {
			const item = blanks[Number(i)]
			if (
				(rect.x > item.x && rect.x < item.x + item.width / 2 && rect.y > item.y && rect.y < item.y + item.height / 2) ||
				(rect.x + item.width > item.x + item.width / 2 &&
					rect.x + item.width < item.x + item.width &&
					rect.y > item.y &&
					rect.y < item.height / 2)
			) {
				// console.log('idx',i,item,pos,rect);
				target.style.background = 'var(--danger-color)'
				const x = item.x - pos.startX
				const y = item.y - pos.startY
				// setPos(pos => {
				//     pos.dx = 0
				//     pos.dy = 0
				//     pos.startX = x
				//     pos.startY = y
				// })
				move(target, { x, y })
				return
			}
		}

		console.log('ccc')
		setPos((pos) => {
			pos.dx = 0
			pos.dy = 0
			pos.startX = 0
			pos.startY = 0
		})

		move(target, { x: 0, y: 0 })
	}

	const move = (e: HTMLElement, pos: { x: number; y: number }) => {
		e.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0px)`
	}

	return (
		<Page className={styles.stick}>
			<div className={styles.main}>
				<ul ref={ref} className={classNames(styles.row, styles.result)}>
					<li className={styles.item}>
						<div className={classNames(styles.box, 'blank')}></div>
					</li>
					<li className={styles.item}>
						<div className={classNames(styles.box, 'blank')}></div>
					</li>
					<li className={styles.item}>
						<div className={classNames(styles.box, 'blank')}></div>
					</li>
					<li className={styles.item}>
						<div className={classNames(styles.box, 'blank')}></div>
					</li>
				</ul>
				<ul className={classNames(styles.row)}>
					{idioms.map((char, idx) => (
						<li key={idx} className={styles.item}>
							<div className={styles.box} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
								{char}
							</div>
						</li>
					))}
				</ul>
			</div>
		</Page>
	)
}

export default Stick
