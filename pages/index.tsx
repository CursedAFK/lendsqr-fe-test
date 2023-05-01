import PageHead from '@/components/PageHead/PageHead'
import ProtectedPage from '@/components/ProtectedPage/ProtectedPage'
import { NextPage } from 'next'
import styles from '../styles/dashboard.module.scss'
import Header from '@/components/Dashboard/Header/Header'

const Dashboard: NextPage = () => {
	return (
		<ProtectedPage>
			<div className={styles.container}>
				<PageHead pageTitle='Dashboard | Lendsqr' />

				<Header />
			</div>
		</ProtectedPage>
	)
}

export default Dashboard
