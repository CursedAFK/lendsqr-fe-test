import PageHead from '@/components/PageHead/PageHead'
import styles from '../styles/dashboard.module.scss'
import { NextPageWithLayout } from './_app'
import { ReactElement } from 'react'
import Layout from '@/components/Dashboard/Layout/Layout'

const Dashboard: NextPageWithLayout = () => {
	return (
		<main className={styles.container}>
			<PageHead pageTitle='Dashboard | Lendsqr' />

			<p>Dashboard</p>
		</main>
	)
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Dashboard
