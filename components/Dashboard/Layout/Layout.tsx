import ProtectedPage from '@/components/ProtectedPage/ProtectedPage'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'

interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<ProtectedPage>
			<Header />
			<section className={styles.container}>
				<Sidebar />
				<aside className={styles.users}>{children}</aside>
			</section>
		</ProtectedPage>
	)
}

export default Layout
