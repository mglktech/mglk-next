import { DefaultLayout } from '../../layouts/DefaultLayout';
// import { Container, Header, Button } from 'semantic-ui-react';
import CardFlow from '../../components/projects/CardFlow';
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

const Index = ({ projects }) => {
	return (
		<DefaultLayout>
			<Segment>
				<Header>Page Goals:</Header>
				<List>
					<List.Content>
						<List.Item>
							Use react-moment to better organise projects by time posted
							(Recently Posted, Have you tried:, You might like:,)
						</List.Item>
						<List.Item>
							Projects should be the overall module study with its picture,
							description and title, but I should be able to make new article
							posts within the projects themselves, Beefing out the projects to
							several articles at a time.
						</List.Item>
						<List.Item></List.Item>
						<List.Item></List.Item>
						<List.Item></List.Item>
					</List.Content>
				</List>
			</Segment>

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

export default Index;
