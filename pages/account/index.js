import Layout from '../../layouts/Default';
import { getSession } from 'next-auth/react';
const Page = () => {
	return (
		<>
			<Layout>Account Page</Layout>
		</>
	);
};
// export async function getServerSideProps(ctx) {
// 	const session = await getSession(ctx);
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/accessDenied',
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }
export default Page;
Page.isAuth = true;
