import { createContext, useContext } from 'react'

interface StoreProps {}

const Store = createContext<StoreProps | null>(null)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const store = {}

	return <Store.Provider value={store}>{children}</Store.Provider>
}

export const useStore = () => useContext(Store)
