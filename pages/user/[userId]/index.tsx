import Layout from '@/components/Dashboard/Layout/Layout'
import { NextPageWithLayout } from '@/pages/_app'
import { User } from '@/utils/typings/user'
import { Users } from '@/utils/typings/users'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import styles from '../../../styles/user.module.scss'
import PageHead from '@/components/PageHead/PageHead'
import { useRouter } from 'next/router'
import { HiOutlineArrowLongLeft } from 'react-icons/hi2'
import { BsStar, BsStarFill } from 'react-icons/bs'
import Link from 'next/link'
import { useStore } from '@/context/store'
import Image from 'next/image'

interface Props {
	user: User
}

const User: NextPageWithLayout<Props> = ({ user }: Props) => {
	const router = useRouter()

	/* 
    I can't call window apis in getstaticProps, so i can't store and retreive users data through it, i can call it in the component itself through useeffect but fetching data with use effect is not recommended in next js, but possible.

    Uncomment out the useeffect and usestate, then comment the Props, getstaticpaths and getStaticprops to experience local storage data experience
  */

	/*
  const [userData, setUserData] = useState<User | null>(null)

  const getUser = async (userId: string) => {
    const response = await fetch(
      `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${userId}`
    )
    const user: User = await response.json()
    localStorage.setItem('user', JSON.stringify(user))
    setUserData(user)
  }

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      const parsedUser: User = JSON.parse(data)
      const iscurrUser = parsedUser.id === router.query.userId
      if (iscurrUser) {
        setUserData(parsedUser)
        return
      } else {
        getUser(router.query.userId as string)
      }
    }
  }, [router.query.userId])
  */

	const { storeUsersData, addUsersData } = useStore(state => ({
		storeUsersData: state.users,
		addUsersData: state.addUsers
	}))

	const componentUserData =
		storeUsersData.find(storeUser => storeUser.id === user.id) || user

	const changeUserStatus = async (
		id: string,
		status: 'Active' | 'Blacklisted'
	) => {
		if (!storeUsersData.length) {
			alert('Please come in from the dashboard to keep user changes in sync')
			return
		}

		const pendingUsers = storeUsersData.map(user =>
			user.id === id
				? {
						...user,
						status: 'Pending'
				  }
				: user
		)
		addUsersData(pendingUsers)

		await new Promise(resolve => setTimeout(resolve, 2000))

		const updatedUsers = storeUsersData.map(user =>
			user.id === id
				? {
						...user,
						status
				  }
				: user
		)
		addUsersData(updatedUsers)
	}

	if (!user) return <p>User not found</p>

	return (
		<main className={styles.container}>
			<PageHead pageTitle={`${componentUserData.userName} | Lendsqr`} />

			<section className={styles.header}>
				<button>
					<Link href='..'>
						<HiOutlineArrowLongLeft /> Back to Users
					</Link>
				</button>

				<div>
					<h2>User Details</h2>
					<div>
						<button
							onClick={() =>
								changeUserStatus(componentUserData.id, 'Blacklisted')
							}
							disabled={componentUserData.status === 'Blacklisted'}
						>
							Blacklist User
						</button>
						<button
							onClick={() => changeUserStatus(componentUserData.id, 'Active')}
							disabled={componentUserData.status === 'Active'}
						>
							Activate User
						</button>
					</div>
				</div>
			</section>

			<section className={styles.userPrimaryDetails}>
				<header>
					<figure>
						<Image
							src={componentUserData.profile.avatar}
							alt={componentUserData.userName}
							fill
							priority
						/>
					</figure>
					<div>
						<h3>
							{componentUserData.profile.firstName}{' '}
							{componentUserData.profile.lastName}
						</h3>
						<p>{componentUserData.userName}</p>
					</div>
					<div>
						<h4>User&apos;s Tier</h4>
						<p>
							<BsStarFill /> <BsStar /> <BsStar />
						</p>
					</div>
					<div>
						<h3>
							₦{Number(componentUserData.accountBalance).toLocaleString()}
						</h3>
						<p>
							{componentUserData.accountNumber} / {componentUserData.orgName}
						</p>
					</div>
				</header>

				<footer>
					<p>General Details</p>
					<p>Documents</p>
					<p>Bank Details</p>
					<p>Loans</p>
					<p>Savings</p>
					<p>App and System</p>
				</footer>
			</section>

			<section className={styles.userSecondaryDetails}>
				<div>
					<h4>Personal Information</h4>
					<div>
						<div>
							<h6>Full Name</h6>
							<p>
								{' '}
								{componentUserData.profile.firstName}{' '}
								{componentUserData.profile.lastName}
							</p>
						</div>
						<div>
							<h6>Phone Number</h6>
							<p>
								{componentUserData.profile.phoneNumber
									.split('x')[0]
									.replace(/-/g, '')
									.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
							</p>
						</div>
						<div>
							<h6>Email Address</h6>
							<p>{componentUserData.email}</p>
						</div>
						<div>
							<h6>BVN</h6>
							<p>{componentUserData.profile.bvn}</p>
						</div>
						<div>
							<h6>Gender</h6>
							<p>{componentUserData.profile.gender}</p>
						</div>
						<div>
							<h6>Marital Status</h6>
							<p>Single</p>
						</div>
						<div>
							<h6>Children</h6>
							<p>None</p>
						</div>
						<div>
							<h6>Type of Residence</h6>
							<p>Parent&apos;s Apartment</p>
						</div>
					</div>
				</div>

				<div>
					<h4>Education and Employment</h4>
					<div>
						<div>
							<h6>Level of Education</h6>
							<p>{componentUserData.education.level}</p>
						</div>
						<div>
							<h6>Employement Status</h6>
							<p>{componentUserData.education.employmentStatus}</p>
						</div>
						<div>
							<h6>Sector of Employment</h6>
							<p>{componentUserData.education.sector}</p>
						</div>
						<div>
							<h6>Duration of Employment</h6>
							<p>{componentUserData.education.duration}</p>
						</div>
						<div>
							<h6>Office Email</h6>
							<p>{componentUserData.education.officeEmail}</p>
						</div>
						<div>
							<h6>Monthly Income</h6>
							<p>
								₦
								{Number(
									componentUserData.education.monthlyIncome[0]
								).toLocaleString()}{' '}
								- ₦
								{Number(
									componentUserData.education.monthlyIncome[1]
								).toLocaleString()}
							</p>
						</div>
						<div>
							<h6>Loan Repayment</h6>
							<p>
								₦
								{Number(
									componentUserData.education.loanRepayment
								).toLocaleString()}
							</p>
						</div>
					</div>
				</div>

				<div>
					<h4>Socials</h4>
					<div>
						<div>
							<h6>Twitter</h6>
							<p>{componentUserData.socials.twitter}</p>
						</div>
						<div>
							<h6>Facebook</h6>
							<p>{componentUserData.socials.facebook}</p>
						</div>
						<div>
							<h6>Instagram</h6>
							<p>{componentUserData.socials.instagram}</p>
						</div>
					</div>
				</div>

				<div>
					<h4>Guarantor</h4>
					<div>
						<div>
							<h6>Full Name</h6>
							<p>
								{componentUserData.guarantor.firstName}{' '}
								{componentUserData.guarantor.lastName}
							</p>
						</div>
						<div>
							<h6>Phone Number</h6>
							<p>
								{componentUserData.guarantor.phoneNumber
									.split('x')[0]
									.replace(/-/g, '')
									.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
							</p>
						</div>
						<div>
							<h6>Email Address</h6>
							<p>{componentUserData.guarantor.address}</p>
						</div>
						<div>
							<h6>Relationship</h6>
							<p>
								{componentUserData.guarantor.gender === 'Male'
									? 'Brother'
									: 'Sister'}
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export const getStaticProps: GetStaticProps<Props> = async ({
	params
}: GetStaticPropsContext) => {
	const reponse = await fetch(
		`https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${params?.userId}`
	)
	const user: User = await reponse.json()

	return {
		props: {
			user: {
				...user,
				status: 'Active'
			}
		},
		revalidate: 60 * 60 * 24
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(
		'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users'
	)
	const users: Users[] = await response.json()

	// i had to limit the number of prerendered user to 20, because of the server rate limit
	// so any user not generated at build time would be fetched at request time and cached

	return {
		paths: users.slice(0, 20).map(user => ({
			params: {
				userId: user.id
			}
		})),
		fallback: 'blocking'
	}
}

User.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>
}

export default User
