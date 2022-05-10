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
	Divider,
} from 'semantic-ui-react';
import Preview from '../../../components/projects/PagePreview';
import { MarkdownPreview } from '../../../components/article/ArticleEditor';

const Project = ({ id }) => {
	const router = useRouter();
	const [project, setProject] = useState();
	// Project data needs to be fetched Client-side so that the fetch request can use the client's session.
	const getProject = async () => {
		const res = await fetch(`/api/projects/${id}`);
		const { success, data } = await res.json();
		if (success) {
			setProject(data);
			return;
		}
		//router.push('/');
	};
	useEffect(() => {
		getProject();
	}, []);
	return (
		<Style title={project?.title}>
			<Segment basic padded="very">
				<Container>
					<MarkdownPreview form={project} />
				</Container>
			</Segment>
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

export default Project;
