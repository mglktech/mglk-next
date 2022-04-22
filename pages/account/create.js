import { DefaultLayout } from '../../layouts/DefaultLayout';
import { RegisterForm } from '../../components/forms/RegisterForm';
import { ComingSoon } from '../../components/base';
import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';
export default function create() {
	return (
		<DefaultLayout>
			<RegisterForm />
		</DefaultLayout>
	);
}
// This page should only be rendered if you are not logged in.
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (session?.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	const csrfToken = await getCsrfToken({ req: context.req });
	const providers = await getProviders();
	return {
		props: { providers, csrfToken },
	};
}
