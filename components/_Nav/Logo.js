import { useRouter } from 'next/router';
const Logo = () => {
	const router = useRouter();
	return (
		<button onClick={() => router.push('/')}>
			<span className="text-3xl font-bold text-indigo-700">mglk</span>
			<span className="text-xl italic">.tech</span>
		</button>
	);
};

export default Logo;
