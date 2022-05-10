import { DefaultLayout } from '../../layouts/DefaultLayout';
// import { Container, Header, Button } from 'semantic-ui-react';
import { ComingSoon } from '../../components/base';
import { CardPreview } from '../../components/document/DocumentComponent';
import Link from 'next/link';

import {
	Button,
	Card,
	Container,
	Image,
	Icon,
	Segment,
	List,
	Header,
	Divider,
	Label,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';

const _Index = () => {
	return (
		<DefaultLayout>
			<ComingSoon />
		</DefaultLayout>
	);
};

const CardFlow = ({ documents }) => {
	if (!documents) {
		return (
			<>
				<Header as="h6">No documents exist in this context.</Header>
			</>
		);
	}
	return (
		<>
			{documents?.map((document) => (
				<CardPreview key={document._id} form={document}></CardPreview>
			))}
		</>
	);
};
const Index = ({ documents }) => {
	// TODO: create a filter for documents that are less than 6 months old
	//console.log(documents);
	const filteredDocs = documents.filter((doc) => {
		const dateUpdated = new Date(doc.updatedAt);
		const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
		console.log(`${dateUpdated} ${sixMonthsAgo} ${dateUpdated > sixMonthsAgo}`);
		if (dateUpdated > sixMonthsAgo) {
			return doc;
		}
	});

	//console.log(filteredDocs);
	return (
		<DefaultLayout>
			<Container>
				<Segment>
					<Header as="h1">Documents</Header>
					<Divider />
					<Header as="h3">
						Recently Published <Label>Past 6 Months</Label>
					</Header>
					<Card.Group itemsPerRow={3} className="">
						<CardFlow documents={filteredDocs} />
					</Card.Group>
					<Header as="h3">Archive</Header>
					<Card.Group itemsPerRow={3} className="">
						<CardFlow documents={documents} />
					</Card.Group>
				</Segment>

				{/* <div className="grid grid-flow-col grid-cols-4"> */}
			</Container>
		</DefaultLayout>
	);
};

export async function getServerSideProps(ctx) {
	const res = await fetch(
		`http://${ctx.req.headers.host}/api/documents?published=true`
	);
	const data = await res.json();
	//console.log(data);
	return {
		props: {
			documents: data,
		},
	};
}
//export default Index;
export default Index; // Index is in development right now so just display the placeholder instead.
