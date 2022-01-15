import Head from 'next/head';
import NavY from '../components/Nav/NavY';

const Default = ({ children }) => {
	return (
		<div className="">
			<Head>
				<title>Mglk.tech</title>
				<meta name="description" content="By mglk" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
				/>
			</Head>

			<NavY />
			<div className="ml-40">{children}</div>
		</div>
	);
};

export default Default;
