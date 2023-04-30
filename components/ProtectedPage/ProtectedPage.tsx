import { useAuthState } from '@/context/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
	children: React.ReactNode
}

const ProtectedPage = ({ children }: Props) => {
	const { isAuthenticated, addUser } = useAuthState(state => ({
		isAuthenticated: state.isAuthenticated,
		addUser: state.addUser
	}))

	const router = useRouter()

	useEffect(() => {
		console.log(isAuthenticated)
		if (isAuthenticated) return
		router.push('/login')
	}, [isAuthenticated, router])

	useEffect(() => {
		const username = JSON.parse(localStorage.getItem('auth-storage')!)
			.username as string
		if (!username) return
		addUser(username)
	}, [addUser])

	return <>{isAuthenticated ? children : null}</>
}

export default ProtectedPage
