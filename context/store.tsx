import { create } from 'zustand'
import { produce } from 'immer'
import { Users } from '@/utils/typings/users'

interface StoreProps {
	mobileToggle: boolean
	users: Users[]
	openMobileMenu: () => void
	closeMobileMenu: () => void
	addUsers: (usersData: Users[]) => void
}

export const useStore = create<StoreProps>(set => ({
	mobileToggle: false,
	users: [],
	openMobileMenu: () =>
		set(
			produce<StoreProps>(state => {
				state.mobileToggle = true
			})
		),
	closeMobileMenu: () =>
		set(
			produce<StoreProps>(state => {
				state.mobileToggle = false
			})
		),
	addUsers: usersData =>
		set(
			produce<StoreProps>(state => {
				state.users = usersData
			})
		)
}))
