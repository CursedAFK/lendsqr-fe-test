import { Users } from '@/utils/typings/users'
import { IoFilter } from 'react-icons/io5'
import { HiOutlineDotsVertical, HiOutlineEye } from 'react-icons/hi'
import { FiUserX, FiUserCheck } from 'react-icons/fi'
import { Dispatch, SetStateAction, useState } from 'react'
import styles from './UsersTable.module.scss'
import Link from 'next/link'

interface Props {
	users: Users[]
	originalUsersData: Users[]
	changeUserStatus: (id: string, status: 'Active' | 'Blacklisted') => void
	setRawUsersData: Dispatch<SetStateAction<Users[]>>
}

const tableHead = [
	'Organization',
	'Username',
	'Email',
	'Phone Number',
	'Date Joined',
	'Status'
]

const OptionTable = ({
	userId,
	changeUserStatus
}: {
	userId: string
	changeUserStatus: (id: string, status: 'Active' | 'Blacklisted') => void
}) => {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false)

	return (
		<td className={styles.options}>
			<HiOutlineDotsVertical onClick={() => setIsOptionsOpen(prev => !prev)} />
			{isOptionsOpen && (
				<div onClick={() => setIsOptionsOpen(false)}>
					<button>
						<Link href={`/user/${userId}`}>
							<HiOutlineEye /> View Details
						</Link>
					</button>
					<button onClick={() => changeUserStatus(userId, 'Blacklisted')}>
						<FiUserX /> Blacklist User
					</button>
					<button onClick={() => changeUserStatus(userId, 'Active')}>
						<FiUserCheck /> Activate User
					</button>
				</div>
			)}
		</td>
	)
}

const UsersTable = ({
	users,
	changeUserStatus,
	setRawUsersData,
	originalUsersData
}: Props) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [formData, setFormData] = useState({
		organization: '',
		username: '',
		email: '',
		date: '',
		phoneNumber: '',
		status: ''
	})

	const uniqueOrgLists = [
		...new Set(originalUsersData.map(item => item.orgName))
	]
		.map(name => {
			return originalUsersData.find(item => item.orgName === name)
		})
		.sort((a, b) => a!.orgName.localeCompare(b!.orgName))

	const formatDate = (userDate: Date) => {
		const date = new Date(userDate)
		const formattedDate = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		}).format(date)
		return formattedDate
	}

	const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const filteredUsers = originalUsersData.filter(
			user =>
				(!formData.organization ||
					user.orgName.includes(formData.organization)) &&
				(!formData.username || user.userName.includes(formData.username)) &&
				(!formData.email || user.email.includes(formData.email)) &&
				(!formData.date || user.createdAt.toString().includes(formData.date)) &&
				(!formData.phoneNumber ||
					user.phoneNumber.includes(formData.phoneNumber)) &&
				(!formData.status || user.status.includes(formData.status))
		)
		setRawUsersData(filteredUsers)
		setIsFilterOpen(false)
	}

	return (
		<>
			<table className={styles.container}>
				<thead>
					<tr>
						{tableHead.map(head => (
							<th
								key={head}
								onClick={() => setIsFilterOpen(prev => !prev)}
							>
								{head} <IoFilter />
							</th>
						))}
						<th></th>
					</tr>
				</thead>

				<tbody>
					{users.length === 0 ? (
						<tr>
							<td colSpan={tableHead.length}>No Users Found</td>
						</tr>
					) : (
						users.map(user => (
							<tr key={user.id}>
								<td>{user.orgName}</td>
								<td>{user.userName}</td>
								<td>{user.email}</td>
								<td>
									{user.phoneNumber
										.split('x')[0]
										.replace(/-/g, '')
										.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
								</td>
								<td>{formatDate(user.createdAt)}</td>
								<td>
									<p
										className={`${user.status === 'Active' && styles.active} ${
											user.status === 'Blacklisted' && styles.blacklisted
										} ${user.status === 'Pending' && styles.pending}`}
									>
										{user.status}
									</p>
								</td>
								<OptionTable
									userId={user.id}
									changeUserStatus={changeUserStatus}
								/>
							</tr>
						))
					)}
				</tbody>
			</table>

			{isFilterOpen && (
				<form
					className={styles.formFilter}
					onSubmit={handleFilter}
				>
					<div>
						<label htmlFor='organization'>Organization</label>
						<select
							name='organization'
							id='organization'
							onChange={e =>
								setFormData({
									...formData,
									organization: e.target.value
								})
							}
							value={formData.organization}
						>
							<option hidden>Select</option>
							{uniqueOrgLists.map(user => (
								<option
									value={user!.orgName}
									key={user!.id}
								>
									{user!.orgName}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							placeholder='User'
							value={formData.username}
							onChange={e =>
								setFormData({ ...formData, username: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							placeholder='Email'
							value={formData.email}
							onChange={e =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							onChange={e =>
								setFormData({
									...formData,
									date: new Date(e.target.value).toLocaleString('default', {
										year: 'numeric',
										month: 'short',
										day: 'numeric'
									})
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='phoneNumber'>Phone Number</label>
						<input
							type='text'
							name='phoneNumber'
							id='phoneNumber'
							placeholder='Phone Number'
							value={formData.phoneNumber}
							onChange={e =>
								setFormData({ ...formData, phoneNumber: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor='status'>Status</label>
						<select
							name='status'
							value={formData.status}
							onChange={e =>
								setFormData({ ...formData, status: e.target.value })
							}
							id='status'
						>
							<option hidden>Select</option>
							<option value='Active'>active</option>
							<option value='Blacklisted'>blacklisted</option>
						</select>
					</div>

					<div>
						<button
							type='reset'
							onClick={() =>
								setFormData({
									organization: '',
									username: '',
									email: '',
									date: '',
									phoneNumber: '',
									status: ''
								})
							}
						>
							Reset
						</button>
						<button type='submit'>Filter</button>
					</div>
				</form>
			)}
		</>
	)
}

export default UsersTable
