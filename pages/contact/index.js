import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
import { Form, Segment, Container } from 'semantic-ui-react';
const Index = () => {
	return (
		<DefaultLayout>
			{/* <ComingSoon /> */}
			<Segment>
				<Container>
					use the form below to contact me directly, responses normally take 3-5
					working days. You can also contact me via my Facebook Page
					<Form>
						<Form.Group>
							<Form.Field
								label="Your Name"
								control="input"
								width={4}
							></Form.Field>
							<Form.Field
								label="Your Email"
								control="input"
								width={8}
							></Form.Field>
						</Form.Group>
						<Form.Field label="Subject" control="input" />
						<Form.Field label="Message" control="textarea"></Form.Field>
						<Form.Button content="Submit" type="submit" />
					</Form>
				</Container>
			</Segment>
		</DefaultLayout>
	);
};

export default Index;
