import ProtectedPage from '@/components/ProtectedPage/ProtectedPage'
import { NextPage } from 'next'

const Dashboard: NextPage = () => {
	return (
		<ProtectedPage>
			<div>Dashboard</div>
		</ProtectedPage>
	)
}

export default Dashboard
