import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Props {
	children: React.ReactNode
}

const ProtectedPage = ({ children }: Props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (isAuthenticated) return
		const lendsqrEmail = sessionStorage.getItem('lendsqr-email')
		if (lendsqrEmail) return setIsAuthenticated(true)
		router.push('/login')
	}, [router, isAuthenticated])

	return <>{isAuthenticated ? children : null}</>
}

export default ProtectedPage
