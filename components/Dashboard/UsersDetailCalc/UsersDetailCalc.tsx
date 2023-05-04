import { IconType } from 'react-icons'
import styles from './UsersDetailCalc.module.scss'

interface Props {
	Icon: IconType
	title: string
	total: number
}

const UsersDetailCalc = ({ Icon, title, total }: Props) => {
	return (
		<div className={styles.container}>
			<figure>
				<Icon />
			</figure>
			<p className={styles.title}>{title}</p>
			<p className={styles.total}>{Math.floor(total).toLocaleString()}</p>
		</div>
	)
}

export default UsersDetailCalc
