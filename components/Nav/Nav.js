// import Button from '../Button/Button';
import { Button } from 'semantic-ui-react';
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
		<div className="flex justify-between items-center bg-gray-200 w-full sticky top-0 z-50">
			<div className="inline-block mx-5">
				<Logo />
			</div>
			<span className="text-xl italic text-gray-400 truncate overflow-ellipsis">
				{spData.name}
			</span>
			<div className="inline-flex p-2 space-x-2">
				<Button
					basic
					color="violet"
					content="Articles"
					icon="book"
					labelPosition="right"
					onClick={() => router.push('/articles')}
				/>
				<Button
					basic
					color="purple"
					content="Sign In"
					icon="sign-in"
					labelPosition="right"
					onClick={() => router.push('/login')}
				/>
				<Button
					basic
					color="purple"
					content="Sign Up"
					icon="add user"
					labelPosition="right"
					onClick={() => router.push('/signup')}
				/>
				{/* <Button
					text="Articles"
					onClick={() => {
						router.push('/articles');
					}}
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconLeft={<FaClipboardList className="mx-1" />}
				/>

				<Button
					text="Login"
					onClick={() => router.push('/login')}
					className="rounded bg-indigo-500 text-white p-2 m-2"
					iconLeft={<FaUserAlt className="mx-1" />}
				/>
				<Button
					text="Sign Up"
					onClick={() => router.push('/signup')}
					className="rounded border border-indigo-500 p-2 m-2 text-indigo-700"
					iconRight={<FaClipboardList className="mx-1" />}
				/> */}
			</div>
		</div>
	);
};
Nav.defaultProps = {
	midText: 'Now with Middle text!',
};

export default Nav;
