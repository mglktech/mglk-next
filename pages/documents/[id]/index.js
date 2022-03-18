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
			{project?.archived ? (
				<div className=" bg-red-700 text-white min-w-full text-center p-1">
					This project is Archived
				</div>
			) : (
				<></>
			)}
			{project && !project.published ? (
				<div className=" bg-yellow-600 text-white min-w-full text-center p-1">
					This project is Not Published (yet)
				</div>
			) : (
				<></>
			)}

			<Container>
				<MarkdownPreview form={project} />
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

export default Project;
