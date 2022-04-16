import { DefaultLayout as Style } from '../../../layouts/DefaultLayout';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Confirm,
	Button,
	Loader,
	Container,
	Image,
	Header,
	Label,
	Segment,
	List,
} from 'semantic-ui-react';

import { MarkdownPreview } from '../../../components/document/DocumentComponent';

const Document = ({ id }) => {
	const router = useRouter();
	const [document, setDocument] = useState();
	// Document data needs to be fetched Client-side so that the fetch request can use the client's session.
	const getDocument = async () => {
		const res = await fetch(`/api/documents/${id}`);
		//console.log(res);
		if (res.ok) {
			const data = await res.json();
			setDocument(data);
			return;
		}
		//router.push('/404');
	};
	useEffect(() => {
		getDocument();
	}, []);
	return (
		<Style title={document?.title}>
			<Container>
				<MarkdownPreview form={document} />
			</Container>
		</Style>
	);
};

export async function getServerSideProps(ctx) {
	const id = ctx?.query?.id;

	return {
		props: {
			id,
		},
	};
}

export default Document;
