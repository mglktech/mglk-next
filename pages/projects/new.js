import { DefaultLayout } from '../../layouts/DefaultLayout';
import { ProjectEditor, ProjectPreview } from '../../components/projects';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { useSession, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
const Page = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [form, setForm] = useState({
		author: session?.user?.discord_id,
		title: '',
		description: ``,
		headerImage_url: '/bin/fire_dancer.jpg',
		headerImage_height: 15,
		content: '### Hello World',
	});
	const [errorLabel, SetErrorLabel] = useState();
	const handleFormChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	const createProject = async () => {
		try {
			const res = await fetch('/api/projects', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			}).then((res) => res.json());

			if (!res.success) {
				SetErrorLabel('There was an error submitting this form.');
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
								project={form}
								setProject={handleFormChange}
								errorLabel={errorLabel}
							/>
						</Grid.Column>
						<Grid.Column>
							<ProjectPreview project={form} />
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

Page.auth = true;
Page.admin = true;
export default Page;
