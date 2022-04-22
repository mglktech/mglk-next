import {
	getProviders,
	signIn,
	getSession,
	getCsrfToken,
} from 'next-auth/react';
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
import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
export default function logout({ csrfToken }) {
	return (
		<DefaultLayout>
			<Container text className="pt-10">
				<Segment className="flex flex-col justify-center text-center">
					<Header as="h1">
						<Icon name="plug"></Icon>
						Before you go...
					</Header>
					<Header as="h4" block>
						You are about to end your session with mglk.tech <br />
						Are you sure you want to do this?
					</Header>

					<Form action="/api/auth/signout" method="POST">
						<Form.Input
							name="csrfToken"
							type="hidden"
							defaultValue={csrfToken}
						/>

						<Form.Button type="submit">Yes, Sign out</Form.Button>
					</Form>
				</Segment>
			</Container>
		</DefaultLayout>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
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
