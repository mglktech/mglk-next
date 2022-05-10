import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon, Uuid } from '../../components/base';
import { FormHeader } from '../../components/forms/FormComponents';
import { Form, Segment, Container } from 'semantic-ui-react';
import { getSession } from 'next-auth/react';
const Index = ({ uuid }) => {
	return (
		<DefaultLayout>
			<Container text className="pt-5">
				{/* <ContactFormSegment uuid={uuid} /> */}
				<ComingSoon />
			</Container>
		</DefaultLayout>
	);
};

// If not logged in, show a redirect button to login / create an account.
// if logged in, show contact form.

export async function getServerSideProps(context) {
	// Fetch data from external API
	const session = await getSession({ req: context.req });
	if (!session?.user) {
		return {
			redirect: {
				destination: '/account/signin',
				permanent: false,
			},
		};
	}

	//const userInfo = await getUser(session.user.uuid);
	//console.log('userInfo', userInfo);
	return { props: { uuid: session.user.uuid } };
}

const ContactFormSegment = ({ uuid }) => {
	return (
		<Segment>
			<FormHeader
				content="Send a Message"
				icon="envelope"
				sub="Use the form below to contact me through the website"
			/>

			<Form>
				Your User ID is: <Uuid uuid={uuid} />
				<Form.Field label="Subject" control="input" />
				{/* Make subject a selectable, when "Other" is selected, show an input box. */}
				<Form.Field label="Message" control="textarea"></Form.Field>
				<Form.Button content="Submit" type="submit" />
			</Form>
		</Segment>
	);
};
export default Index;
