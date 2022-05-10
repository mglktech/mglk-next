import { DefaultLayout } from '../layouts/DefaultLayout';
import { FrontPageHero } from '../components/base';
import {
	Button,
	Container,
	Header,
	Icon,
	Segment,
	Grid,
	List,
	Divider,
	Image,
	Popup,
	Label,
	ListHeader,
} from 'semantic-ui-react';
export default function Home() {
	return (
		<div className="App">
			<DefaultLayout footer={false} title="mglk.tech">
				<FrontPageHero />
			</DefaultLayout>
		</div>
	);
}
