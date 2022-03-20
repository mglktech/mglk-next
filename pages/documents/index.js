import { DefaultLayout } from '../../layouts/DefaultLayout';
// import { Container, Header, Button } from 'semantic-ui-react';
import { ComingSoon } from '../../components/base';
import { CardPreview } from '../../components/document/DocumentEditor';
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
	return (
		<>
			{documents?.map((document) => (
				<CardPreview key={document._id} form={document}></CardPreview>
			))}
		</>
	);
};
const Index = ({ documents }) => {
	return (
		<DefaultLayout>
			<Container>
				<h1>Documents</h1>
				{/* <div className="grid grid-flow-col grid-cols-4"> */}
				<Card.Group itemsPerRow={3} className="justify-center">
					<CardFlow documents={documents} />
				</Card.Group>
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
