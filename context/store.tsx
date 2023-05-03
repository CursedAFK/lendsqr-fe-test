import { create } from 'zustand'
import { produce } from 'immer'

interface StoreProps {
	mobileToggle: boolean
	openMobileMenu: () => void
	closeMobileMenu: () => void
}

export const useStore = create<StoreProps>(set => ({
	mobileToggle: false,
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
		)
}))
