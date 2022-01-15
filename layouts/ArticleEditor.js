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
			<div className="flex flex-row">
				<div className="flex flex-col">
					<NavY />
				</div>
				<div className="flex flex-col w-full">{children}</div>
			</div>
		</div>
	);
};

export default Default;
