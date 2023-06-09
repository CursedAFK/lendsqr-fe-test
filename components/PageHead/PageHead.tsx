import Head from 'next/head'

interface Props {
	pageTitle: string
}

const PageHead = ({ pageTitle = 'Welcome | Lendsqr' }: Props) => {
	return (
		<Head>
			<title>{pageTitle}</title>
			<meta
				content='width=device-width, initial-scale=1'
				name='viewport'
			/>
			<meta
				name='description'
				content='Lendsqr is a platform used by over half a million lenders to provide loans to customers. Our frontend software stack is built with React, TypeScript and SCSS, allowing us to ideate and release features rapidly and reliably. This web app showcases our frontend engineering capabilities, with a focus on visual fidelity, code quality, and best practices in design and architecture. The app includes login, dashboard, user page, and user details page, all of which pull data from a mock API with 500 records. Designed to be mobile responsive, this app is a testament to Lendsqr commitment to attention to detail and meeting acceptance criteria. Try it out now!'
			/>
			<meta
				name='robots'
				content='index, follow'
			/>
			<meta
				property='og:title'
				content={pageTitle}
			/>
			<meta
				property='og:description'
				content='Lendsqr is a platform used by over half a million lenders to provide loans to customers. Our frontend software stack is built with React, TypeScript and SCSS, allowing us to ideate and release features rapidly and reliably. This web app showcases our frontend engineering capabilities, with a focus on visual fidelity, code quality, and best practices in design and architecture. The app includes login, dashboard, user page, and user details page, all of which pull data from a mock API with 500 records. Designed to be mobile responsive, this app is a testament to Lendsqr commitment to attention to detail and meeting acceptance criteria. Try it out now!'
			/>
			<meta
				property='og:image'
				content='https://abdulramon-lasisi-lendsqr-fe-test-bmdiw7xj1-cursedafk.vercel.app/images/preview.png'
			/>
			<meta
				property='og:url'
				content='https://abdulramon-lasisi-lendsqr-fe-test-bmdiw7xj1-cursedafk.vercel.app'
			/>
			<link
				rel='icon'
				href='logo.png'
			/>
		</Head>
	)
}

export default PageHead
