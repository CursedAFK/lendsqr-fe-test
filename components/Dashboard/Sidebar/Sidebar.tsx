import styles from './Sidebar.module.scss'
import { HiUsers } from 'react-icons/hi'
import {
	FaUsers,
	FaRegHandshake,
	FaPiggyBank,
	FaHandHoldingUsd,
	FaUserCheck,
	FaUserTimes,
	FaBriefcase,
	FaCoins,
	FaUserCog,
	FaScroll,
	FaChartBar,
	FaSlidersH,
	FaPercentage,
	FaClipboardList,
	FaHome
} from 'react-icons/fa'
import { TbMoneybag } from 'react-icons/tb'
import { RiBankLine } from 'react-icons/ri'
import { GrTransaction } from 'react-icons/gr'
import { BsGearFill } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import Links from './Links/Links'

const customersLinks = [
	{
		id: 1,
		name: 'Users',
		icon: HiUsers
	},
	{
		id: 2,
		name: 'Guarantors',
		icon: FaUsers
	},
	{
		id: 3,
		name: 'Loans',
		icon: TbMoneybag
	},
	{
		id: 4,
		name: 'Decision Models',
		icon: FaRegHandshake
	},
	{
		id: 5,
		name: 'Savings',
		icon: FaPiggyBank
	},
	{
		id: 6,
		name: 'Loan Requests',
		icon: FaHandHoldingUsd
	},
	{
		id: 7,
		name: 'Whitelist',
		icon: FaUserCheck
	},
	{
		id: 8,
		name: 'Karma',
		icon: FaUserTimes
	}
]

const businessesLinks = [
	{
		id: 1,
		name: 'Organization',
		icon: FaBriefcase
	},
	{
		id: 2,
		name: 'Loan Products',
		icon: FaHandHoldingUsd
	},
	{
		id: 3,
		name: 'Savings Products',
		icon: RiBankLine
	},
	{
		id: 4,
		name: 'Fees and Charges',
		icon: FaCoins
	},
	{
		id: 5,
		name: 'Transactions',
		icon: GrTransaction
	},
	{
		id: 6,
		name: 'Services',
		icon: BsGearFill
	},
	{
		id: 7,
		name: 'Service Account',
		icon: FaUserCog
	},
	{
		id: 8,
		name: 'Settlements',
		icon: FaScroll
	},
	{
		id: 9,
		name: 'Reports',
		icon: FaChartBar
	}
]

const settingsLinks = [
	{
		id: 1,
		name: 'Preferences',
		icon: FaSlidersH
	},
	{
		id: 2,
		name: 'Fees and Pricing',
		icon: FaPercentage
	},
	{
		id: 3,
		name: 'Audit Logs',
		icon: FaClipboardList
	}
]

const Sidebar = () => {
	return (
		<aside className={styles.container}>
			<section>
				<h3>
					<FaBriefcase /> Switch Organization <IoIosArrowDown />
				</h3>
				<p>
					<FaHome /> Dashboard
				</p>
			</section>

			<Links
				title='Customers'
				links={customersLinks}
			/>

			<Links
				title='Businesses'
				links={businessesLinks}
			/>

			<Links
				title='Settings'
				links={settingsLinks}
			/>
		</aside>
	)
}

export default Sidebar
