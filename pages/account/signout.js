import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';

import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
export default function logout({ csrfToken }) {
	return (
		<DefaultLayout>
			<ComingSoon />
			<form action="/api/auth/signout" method="POST">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<button type="submit">Sign out</button>
			</form>
		</DefaultLayout>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session?.user) {
		console.log('User is already signed out');
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
