import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';
export default function SignIn({ providers, csrfToken }) {
	return (
		<form method="post" action="/api/auth/callback/credentials">
			<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
			<label>
				Username
				<input name="email" type="text" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button type="submit">Sign in</button>
		</form>
	);
}

// This is the recommended way for Next.js 9.3 or newer

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (session?.user) {
		console.log('User is already signed in');
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
