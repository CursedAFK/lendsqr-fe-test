import Image from 'next/image'
import styles from './Header.module.scss'
import LendsqrText from '@/components/Icons/LendsqrText'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsBell } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { VscSignOut } from 'react-icons/vsc'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Header = () => {
	const [username, setUsername] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	const router = useRouter()

	const handleSignout = () => {
		sessionStorage.removeItem('lendsqr-email')
		router.push('/login')
	}

	const handleKeyDown = (e: any) => {
		const keyEvent = e as KeyboardEvent
		if (keyEvent.key !== 'Enter') return
		e.preventDefault()
		handleSearch()
	}

	const handleSearch = () => {
		if (!searchTerm) return
	}

	useEffect(() => {
		if (!sessionStorage.getItem('lendsqr-email')) return
		setUsername(
			sessionStorage.getItem('lendsqr-email')!.match(/^[a-zA-Z]+/)![0] as string
		)
	}, [])

	return (
		<header className={styles.container}>
			<Link
				href='/'
				className={styles.logo}
			>
				<Image
					src='/logo.png'
					alt='Lendsqr logo'
					width={25}
					height={26}
				/>
				<LendsqrText />
			</Link>

			<div className={styles.search}>
				<form onSubmit={handleSearch}>
					<input
						type='search'
						name='search'
						placeholder='Search for anything'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button type='submit'>
						<AiOutlineSearch />
					</button>
				</form>
			</div>

			<nav onMouseLeave={() => setIsOpen(false)}>
				<Link href='#'>Docs</Link>
				<BsBell className={styles.bell} />
				<CgProfile className={styles.profile} />
				<div
					className={styles.account}
					onMouseOver={() => setIsOpen(true)}
				>
					<p>{username}</p>
					{isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
					{isOpen && (
						<div onClick={handleSignout}>
							<VscSignOut />
							<p>Sign out</p>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header
