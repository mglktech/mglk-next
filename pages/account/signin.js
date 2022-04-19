import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';

import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';

import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Segment,
	Sidebar,
	Visibility,
	Label,
	Input,
	Form,
	Message,
	Loader,
} from 'semantic-ui-react';

export default function SignIn({ providers, csrfToken }) {
	return (
		<DefaultLayout>
			<Container className="object">
				<Segment padded="very">
					<Form method="POST" action="/api/auth/callback/credentials">
						<Form.Input
							type="hidden"
							name="csrfToken"
							defaultValue={csrfToken}
						/>
						<Form.Input name="email" label="Email" placeholder="Email" />
						<Form.Input
							name="password"
							label="Password"
							placeholder="Password"
							type="password"
						/>
						<Form.Button type="submit">Sign in</Form.Button>
					</Form>
				</Segment>
			</Container>
		</DefaultLayout>
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
