import Head from 'next/head';
import Nav from '../components/Nav/Nav';

const Default = ({ children }) => {
	return (
		<div>
			<Head>
				<title>Mglk.tech</title>
				<meta name="description" content="By mglk" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
				/>
			</Head>
			<Nav />
			<main className="w-screen h-full bg-gray-300">{children}</main>
		</div>
	);
};

export default Default;
