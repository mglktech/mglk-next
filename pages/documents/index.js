import { DefaultLayout } from '../../layouts/DefaultLayout';
// import { Container, Header, Button } from 'semantic-ui-react';
import CardFlow from '../../components/projects/CardFlow';
import { ComingSoon } from '../../components/base';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import {
	Button,
	Card,
	Container,
	Image,
	Icon,
	Segment,
	List,
	Header,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';

const PlaceHolder = () => {
	return (
		<DefaultLayout>
			<ComingSoon />
		</DefaultLayout>
	);
};

const Index = ({ projects }) => {
	return (
		<DefaultLayout>
			<Container>
				<h1>Projects</h1>
				{/* <div className="grid grid-flow-col grid-cols-4"> */}
				<Card.Group itemsPerRow={3} className="justify-center">
					<CardFlow projects={projects} />
				</Card.Group>
			</Container>
		</DefaultLayout>
	);
};

export async function getServerSideProps(ctx) {
	const res = await fetch(
		`http://${ctx.req.headers.host}/api/projects/published`
	);
	const { data } = await res.json();
	//console.log(data);
	return {
		props: {
			projects: data,
		},
	};
}
//export default Index;
export default PlaceHolder; // Index is in development right now so just display the placeholder instead.
