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

	const router = useRouter()

	const handleSignout = () => {
		sessionStorage.removeItem('lendsqr-email')
		router.push('/login')
	}

	useEffect(() => {
		setUsername(
			sessionStorage.getItem('lendsqr-email')!.match(/^[a-zA-Z]+/)![0] as string
		)
	}, [])

	return (
		<header className={styles.container}>
			<div className={styles.logo}>
				<Image
					src='/logo.png'
					alt='Lendsqr logo'
					width={25}
					height={26}
				/>
				<LendsqrText />
			</div>

			<div className={styles.search}>
				<input
					type='search'
					name='search'
				/>
				<AiOutlineSearch />
			</div>

			<nav>
				<Link href='#'>Docs</Link>
				<BsBell />
				<CgProfile />
				<div
					className={styles.account}
					onMouseOver={() => setIsOpen(true)}
					onMouseOut={() => setIsOpen(false)}
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
