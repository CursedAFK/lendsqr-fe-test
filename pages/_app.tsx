import type { AppProps } from 'next/app'
import { Roboto, Work_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.scss'
import { StoreProvider } from '@/context/store'

const roboto = Roboto({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500'],
	variable: '--font-roboto'
})

const workSans = Work_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-work-sans'
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

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StoreProvider>
			<div
				className={`${avNext.variable} ${roboto.variable} ${workSans.variable}`}
			>
				<Component {...pageProps} />
			</div>
		</StoreProvider>
	)
}
