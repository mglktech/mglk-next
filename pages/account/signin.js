import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';

import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
import { FormHeader } from '../../components/forms/FormComponents';
import Link from 'next/link';
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

export default function SignIn({ providers, csrfToken, error }) {
	return (
		<DefaultLayout>
			<Container text className="pt-10">
				<Segment padded>
					<FormHeader
						content="Sign In"
						icon="sign in"
						sub="Sign in to your account"
						divider
					/>
					<Label>
						{'Need to create an account? Sign up for one '}
						<Link href="/account/create">here</Link>
					</Label>

					<Form
						error={error}
						method="POST"
						action="/api/auth/callback/credentials"
					>
						<Form.Input
							type="hidden"
							name="csrfToken"
							defaultValue={csrfToken}
						/>
						<Message
							error
							header="Error"
							content="Incorrect Username / Password Combination"
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
					<Label attached="bottom right">
						Forgot Password? Recover Your Account{' '}
						<Link href="/account/recover">here</Link>.
					</Label>
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
	const error = context?.query?.error ? true : false;
	const csrfToken = await getCsrfToken({ req: context.req });
	const providers = await getProviders();
	return {
		props: { providers, csrfToken, error },
	};
}
