import { useRouter } from 'next/router';
import Layout from '../../../layouts/Default';
const ServerAuth = () => {
	const router = useRouter();
	return (
		<>
			<Layout>Server Auth Route</Layout>
		</>
	);
};

export default ServerAuth;
ServerAuth.auth = true;
