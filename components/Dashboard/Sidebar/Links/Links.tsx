import { IconType } from 'react-icons'
import styles from './Links.module.scss'

interface Props {
	title: string
	links: {
		id: number
		name: string
		icon: IconType
	}[]
}

const Links = ({ title, links }: Props) => {
	return (
		<section className={styles.container}>
			<h4>{title}</h4>
			<ul>
				{links.map(link => (
					<li
						key={link.id}
						className={link.name === 'Users' ? styles.active : ''}
					>
						<link.icon /> {link.name}
					</li>
				))}
			</ul>
		</section>
	)
}

export default Links
