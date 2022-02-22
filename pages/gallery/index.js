import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ComingSoon } from '../../components/base';
import Gallery from '../../components/Gallery';
import { Segment } from 'semantic-ui-react';
const Index = () => {
	return (
		<DefaultLayout>
			{/* <ComingSoon /> */}
			<Segment inverted style={{ margin: '0', padding: '0' }}>
				<Gallery />
			</Segment>
		</DefaultLayout>
	);
};

export default Index;
