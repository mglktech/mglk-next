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
			<Segment>
				<Header>Page Goals:</Header>
				<List>
					<List.Content>
						<List.Item>
							Create a Loading module for this page and apply it when the
							project is still waiting for data.
						</List.Item>
						<List.Item>
							Add a Sidebar that enables you to click through the project and
							see each article attached to it. if no image data exists for a
							specific article, default to the project image data.
						</List.Item>
						<List.Item></List.Item>
						<List.Item></List.Item>
						<List.Item></List.Item>
					</List.Content>
				</List>
			</Segment>
			<Container>
				<Preview project={project} />
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
