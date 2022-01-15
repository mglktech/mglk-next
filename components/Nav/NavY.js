import Button from '../Button/Button';
import { FaUserAlt, FaClipboardList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
const Nav = () => {
	const [spData, setSpData] = useState({});
	const router = useRouter();
	const fetchSpotify = async () => {
		const response = await fetch('/api/spotify/nowPlaying');
		const data = await response.json();
		console.log(data);
		setSpData(data);
	};
	useEffect(() => {
		fetchSpotify();
	}, []);
	return (
		<div className="flex flex-col fixed h-screen justify-between bg-gray-200 p-5 ">
			<Logo />
			<div className="flex flex-col">
				<Button
					text="Editor"
					onClick={() => {
						console.log('Editor button clicked!');
						router.push('/articles/editor');
					}}
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconRight={<FaClipboardList className="mx-1" />}
				/>

				<Button
					text="Login"
					onClick={() => router.push('/login')}
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconRight={<FaUserAlt className="mx-1" />}
				/>
				<Button
					text="Sign Up"
					onClick={() => router.push('/signup')}
					className="rounded border border-indigo-500 p-2 m-2 text-indigo-700"
					iconRight={<FaClipboardList className="mx-1" />}
				/>
			</div>
		</div>
	);
};
Nav.defaultProps = {
	midText: 'Now with Middle text!',
};

export default Nav;
