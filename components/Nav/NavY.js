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

		setSpData(data);
	};
	useEffect(() => {
		fetchSpotify();
	}, []);
	return (
		<div className="flex flex-col h-screen justify-between bg-gray-200 p-3 ">
			<Logo />
			<div className="flex flex-col space-y-2">
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
			</div>
		</div>
	);
};
Nav.defaultProps = {
	midText: 'Now with Middle text!',
};

export default Nav;
