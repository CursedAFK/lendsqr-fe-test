import LendsqrText from '@/components/Icons/LendsqrText'
import PageHead from '@/components/PageHead/PageHead'
import Image from 'next/image'
import styles from '../../styles/login.module.scss'
import { useState } from 'react'
import { useAuthState } from '@/context/store'
import { useRouter } from 'next/router'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { addUser } = useAuthState(state => ({
		addUser: state.addUser
	}))

	const router = useRouter()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		addUser(formData.email)
		setFormData({
			email: '',
			password: ''
		})
		setIsLoading(false)
		router.push('/')
	}

	return (
		<div className={styles.container}>
			<PageHead pageTitle='Login | Lendsqr' />

			<header>
				<Image
					src='/logo.png'
					alt='Lendsqr logo'
					width={25}
					height={26}
				/>
				<LendsqrText />
			</header>

			<main>
				<section>
					<Image
						src='/images/login.png'
						alt='image of a cartoon man with purse'
						fill
						priority
						quality={100}
					/>
				</section>

				<section>
					<h2>Welcome!</h2>
					<p>Enter details to login.</p>

					<form onSubmit={handleSubmit}>
						<input
							type='email'
							name='email'
							placeholder='Email'
							required
							value={formData.email}
							onChange={handleChange}
							className={formData.email ? styles.active : ''}
						/>
						<div>
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Password'
								required
								value={formData.password}
								onChange={handleChange}
								className={formData.password ? styles.active : ''}
							/>
							<p onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? 'HIDE' : 'SHOW'}
							</p>
						</div>
						<p>FORGOT PASSWORD?</p>
						<button
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? 'LOADING ...' : 'LOG IN'}
						</button>
					</form>
				</section>
			</main>
		</div>
	)
}

export default Login
