import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import '@/styles/globals.scss'
import { StoreProvider } from '@/context/store'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const roboto = localFont({
	variable: '--font-roboto',
	src: [
		{
			path: '../public/fonts/roboto/Roboto-Thin.ttf',
			weight: '200',
			style: 'normal'
		},
		{
			path: '../public/fonts/roboto/Roboto-Light.ttf',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../public/fonts/roboto/Roboto-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/roboto/Roboto-Bold.ttf',
			weight: '700',
			style: 'normal'
		}
	]
})

const workSans = localFont({
	variable: '--font-work-sans',
	src: [
		{
			path: '../public/fonts/work-sans/WorkSans-Thin.ttf',
			weight: '200',
			style: 'normal'
		},
		{
			path: '../public/fonts/work-sans/WorkSans-Light.ttf',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../public/fonts/work-sans/WorkSans-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/work-sans/WorkSans-Medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../public/fonts/work-sans/WorkSans-SemiBold.ttf',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../public/fonts/work-sans/WorkSans-Bold.ttf',
			weight: '700',
			style: 'normal'
		}
	]
})

const avNext = localFont({
	variable: '--font-av-next',
	src: [
		{
			path: '../public/fonts/av-next/regular.otf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/av-next/italic.otf',
			weight: '400',
			style: 'italic'
		},
		{
			path: '../public/fonts/av-next/bold.otf',
			weight: '700',
			style: 'normal'
		}
	]
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page)

	return getLayout(
		<StoreProvider>
			<div
				className={`${avNext.variable} ${roboto.variable} ${workSans.variable}`}
			>
				<Component {...pageProps} />
			</div>
		</StoreProvider>
	)
}
