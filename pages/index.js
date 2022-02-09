import { DefaultLayout, HomepageLayout } from '../layouts/DefaultLayout';

import Hero from '../components/Hero/Hero';
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
} from 'semantic-ui-react';
export default function Home() {
	return (
		<div className="App">
			<HomepageLayout></HomepageLayout>
		</div>
	);
}
