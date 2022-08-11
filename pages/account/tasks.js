import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Container, Segment } from 'semantic-ui-react';
const tasks = () => {
	return (
		<DefaultLayout>
			<Container>
				<Segment>Tasks</Segment>
			</Container>
		</DefaultLayout>
	);
};

export default tasks;
