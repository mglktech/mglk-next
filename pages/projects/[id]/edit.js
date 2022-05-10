import { DefaultLayout } from '../../../layouts/DefaultLayout';
import { ArticleEditor } from '../../../components/article/ArticleEditor';
import { ProjectEditor, ProjectPreview } from '../../../components/projects';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { useSession, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const Page = ({ id }) => {
	return (
		<>
			<DefaultLayout>
				<ArticleEditor id={id} />
			</DefaultLayout>
		</>
	);
};
const _Page = ({ id }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const [project, setProject] = useState({
		author: session?.user?.discord_id,
		title: '',
		description: ``,
		headerImage_url: '/bin/fire_dancer.jpg',
		headerImage_height: 15,
		content: '### Hello World',
	});
	const [errorLabel, SetErrorLabel] = useState();
	const handleFormChange = (e) => {
		setProject({
			...project,
			[e.target.name]: e.target.value,
		});
	};
	const getProject = async () => {
		const { success, data } = await fetch(`/api/projects/${id}`).then((res) =>
			res.json()
		);
		if (success) {
			setProject(data);
		}
	};
	useEffect(() => {
		getProject();
	}, []);
	const createProject = async () => {
		try {
			const res = await fetch(`/api/projects/${id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(project),
			}).then((res) => res.json());

			if (!res.success) {
				SetErrorLabel('There was an error submitting this project.');
				return;
			}
			router.push('/admin');
			return;
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<DefaultLayout>
			<Segment vertical>
				<Grid celled="internally" columns="equal" stackable>
					<Grid.Row>
						<Grid.Column>
							<ProjectEditor
								project={project}
								setProject={handleFormChange}
								errorLabel={errorLabel}
							/>
						</Grid.Column>
						<Grid.Column>
							<ProjectPreview project={project} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Button onClick={createProject}>Submit</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</DefaultLayout>
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

Page.requireRole = 'Owner';
export default Page;
