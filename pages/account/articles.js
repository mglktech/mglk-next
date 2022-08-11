import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Container, Segment } from 'semantic-ui-react';
const articles = () => {
	return (
		<DefaultLayout>
			<Container>
				<Segment>Articles</Segment>
			</Container>
		</DefaultLayout>
	);
};

export default articles;
