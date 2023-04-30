import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStateProps {
	isAuthenticated: boolean
	username: string
	addUser: (newUsername: string) => void
	removeUser: () => void
}

export const useAuthState = create(
	persist<AuthStateProps>(
		set => ({
			isAuthenticated: false,
			username: '',
			addUser: (newUsername: string) =>
				set(state => ({
					...state,
					isAuthenticated: true,
					username: newUsername
				})),
			removeUser: () =>
				set(state => ({
					...state,
					isAuthenticated: false,
					username: ''
				}))
		}),
		{
			name: 'auth-storage'
		}
	)
)
