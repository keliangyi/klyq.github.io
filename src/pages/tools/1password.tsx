import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import Hashes from 'jshashes'
import styles from './1pwd.less'
import { copyText } from '@/util'
import { Page } from '@/components'

interface AppProps {}

const MYPASSWORD = 'CPV5EptDwD/3NuF2E1AShpmJBHeTps0CXmIXhM+QHAA='

const HASHTYPES = ['MD5', 'SHA1', 'SHA256', 'SHA512', 'RMD160']

const GenForm: React.FC<any> = () => {
	const [pwd, setPwd] = useState('')
	const [vals, setVals] = useState({
		type: HASHTYPES[1],
		content: '',
		hmac: '',
		length: '4',
	})

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
		e.persist()
		setVals((c) => ({ ...c, [field]: e.target.value }))
	}

	const handleGen = () => {
		for (let [key, val] of Object.entries(vals)) {
			if (!val) {
				alert(key + ' 没有填写')
				return
			}
		}
		const encrpty = new Hashes[vals.type]()
		const password = (encrpty.b64_hmac(vals.hmac, vals.content) as string).substring(2, parseInt(vals.length) + 2)
		setPwd(password)
	}

	const copy = () => {
		if (pwd === '') {
			return
		}
		copyText(pwd)
	}

	return (
		<div className={styles.form}>
			<div className={styles.formItem}>
				<label>加密类型：</label>
				<span>
					<select value={vals.type} onChange={(e) => handleFieldChange(e, 'type')}>
						{HASHTYPES.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</span>
			</div>
			<div className={styles.formItem}>
				<label>内容：</label>
				<span>
					<input value={vals.content} onChange={(e) => handleFieldChange(e, 'content')} type="text" placeholder="110@qq.com#1" />
				</span>
			</div>
			<div className={styles.formItem}>
				<label>HMAC：</label>
				<span>
					<input value={vals.hmac} onChange={(e) => handleFieldChange(e, 'hmac')} type="password" placeholder="hmac" />
				</span>
			</div>
			<div className={styles.formItem}>
				<label>长度：</label>
				<span>
					<input
						title={vals.length.toString()}
						value={vals.length}
						onChange={(e) => handleFieldChange(e, 'length')}
						min={4}
						max={30}
						type="range"
					/>
				</span>
			</div>
			<div className={styles.formItem}>
				<label></label>
				<span>
					<button type="button" onClick={handleGen}>
						立即生成
					</button>
				</span>
			</div>
			{pwd && (
				<div className={styles.result}>
					<a href="#" title="点击复制" onClick={copy}>
						{pwd}
					</a>
				</div>
			)}
		</div>
	)
}

interface PasswordInputProps {
	htmlType?: 'password' | 'number'
	length?: number
	className?: string
	onSubmit?: (val: string) => void
}

const PasswordInput: React.FC<PasswordInputProps> = React.memo(({ length, className, htmlType, onSubmit }) => {
	const [val, setVal] = useState('')
	const [foucs, setFoucs] = useState(false)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value)
	}

	useEffect(() => {
		if (val.length === length && onSubmit) {
			onSubmit(val)
			setTimeout(() => {
				setVal('')
			}, 1000)
		}
	}, [val, length, onSubmit])

	const offsetLeft = useMemo(() => {
		if (!foucs) {
			return { display: 'none' }
		}
		if (val.length === length) {
			return { left: (50 + 14) * (length - 1) }
		}
		return { left: (50 + 14) * val.length }
	}, [val, foucs, length])

	const preventDefault = (e: any) => {
		e.preventDefault()
	}

	return (
		<div className={classNames(styles.password, className)}>
			<input
				onContextMenu={preventDefault}
				onPaste={preventDefault}
				onCopy={preventDefault}
				onCut={preventDefault}
				autoComplete="off"
				type={htmlType}
				maxLength={length}
				onFocus={() => {
					setFoucs(true)
				}}
				autoFocus
				onBlur={() => setFoucs(false)}
				value={val}
				onChange={handleChange}
			/>
			<div className={styles.box} style={offsetLeft}></div>
			{[...new Array(length).keys()].map((i, idx) => (
				<span
					key={idx}
					className={classNames(styles.input, {
						[styles.active]: foucs && val.length === idx,
					})}
				>
					{idx + 1 <= val.length && '*'}
				</span>
			))}
		</div>
	)
})

PasswordInput.defaultProps = {
	length: 6,
}

const IPwd: React.FC<AppProps> = () => {
	const [offset, setOffset] = useState(0)
	const handleGuard = (v: string) => {
		const guard = new Hashes.SHA256().b64_hmac(`${v}_iphone_password`, v)
		if (guard !== MYPASSWORD) {
			setTimeout(() => {
				alert('密码错误')
			}, 600)
		} else {
			setOffset(-50)
		}
	}

	return (
		<Page className={styles.ipwd}>
			<div className={styles.App}>
				<div className={styles.guard}>
					<div className={styles.left} style={offset ? { left: offset + 'vw' } : {}}></div>
					<div className={styles.right} style={offset ? { right: offset + 'vw' } : {}}></div>
					<div
						className={classNames(styles.wrapper, {
							[styles.show]: offset,
						})}
					>
						{offset ? <GenForm /> : null}
					</div>
					{!offset ? <PasswordInput onSubmit={handleGuard} /> : null}
				</div>
			</div>
		</Page>
	)
}

export default IPwd
