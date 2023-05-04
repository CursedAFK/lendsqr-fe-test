import PageHead from '@/components/PageHead/PageHead'
import styles from '../styles/dashboard.module.scss'
import { NextPageWithLayout } from './_app'
import { ReactElement, useEffect, useState } from 'react'
import Layout from '@/components/Dashboard/Layout/Layout'
import { Users } from '@/utils/typings/users'
import { GetStaticProps } from 'next'
import UsersDetailCalc from '@/components/Dashboard/UsersDetailCalc/UsersDetailCalc'
import {
	HiOutlineUsers,
	HiOutlineUserGroup,
	HiOutlineDocumentText
} from 'react-icons/hi'
import { BsDatabase } from 'react-icons/bs'
import UsersTable from '@/components/Dashboard/UsersTable/UsersTable'
import Pagination from '@/components/Dashboard/Pagination/Pagination'

interface Props {
	users: Users[]
}

const Dashboard: NextPageWithLayout<Props> = ({ users }) => {
	const [rawUsersData, setRawUsersData] = useState(users)
	const [paginate, setPaginate] = useState({
		start: 0,
		end: 10
	})
	const [paginatedUserData, setPaginatedUserData] = useState(
		rawUsersData.slice(paginate.start, paginate.end)
	)

	const changePage = (page: number) =>
		setPaginate({
			start: 10 * (page - 1),
			end: 10 * page
		})

	const changeUserStatus = async (
		id: string,
		status: 'Active' | 'Blacklisted'
	) => {
		const pendingUsers = rawUsersData.map(user =>
			user.id === id
				? {
						...user,
						status: 'Pending'
				  }
				: user
		)
		setRawUsersData(pendingUsers)

		await new Promise(resolve => setTimeout(resolve, 2000))

		const updatedUsers = rawUsersData.map(user =>
			user.id === id
				? {
						...user,
						status
				  }
				: user
		)
		setRawUsersData(updatedUsers)
	}

	useEffect(() => {
		setPaginatedUserData(rawUsersData.slice(paginate.start, paginate.end))
	}, [paginate, rawUsersData])

	if (!users) return <p>Loading ...</p>

	return (
		<main className={styles.container}>
			<PageHead pageTitle='Dashboard | Lendsqr' />

			<h2>Users</h2>

			<section className={styles.usersCountSection}>
				<UsersDetailCalc
					title='Users'
					Icon={HiOutlineUsers}
					total={users.length}
				/>
				<UsersDetailCalc
					title='Active Users'
					Icon={HiOutlineUserGroup}
					total={users.length}
				/>
				<UsersDetailCalc
					title='Users with loans'
					Icon={HiOutlineDocumentText}
					total={users.reduce(
						(acc, curr) => acc + Number(curr.education.loanRepayment),
						0
					)}
				/>
				<UsersDetailCalc
					title='Users with savings'
					Icon={BsDatabase}
					total={users.reduce(
						(acc, curr) => acc + Number(curr.accountBalance),
						0
					)}
				/>
			</section>

			<section className={styles.usersTableSection}>
				<UsersTable
					originalUsersData={users}
					users={paginatedUserData}
					changeUserStatus={changeUserStatus}
					setRawUsersData={setRawUsersData}
				/>
			</section>

			<section className={styles.paginationSection}>
				<Pagination
					pageLists={Array.from(
						{
							length: rawUsersData.length < 10 ? 1 : rawUsersData.length / 10
						},
						(_, index) => index + 1
					)}
					activePage={
						paginate.end === rawUsersData.length
							? rawUsersData.length / 10
							: paginate.end / 10
					}
					changePage={changePage}
				/>
			</section>
		</main>
	)
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const response = await fetch(
		'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users'
	)
	const users: Users[] = await response.json()

	return {
		props: {
			users: users
				.map(user => ({ ...user, status: 'Active' }))
				.sort((a, b) => a.orgName.localeCompare(b.orgName))
		},
		revalidate: 60 * 60 * 24
	}
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default Dashboard
