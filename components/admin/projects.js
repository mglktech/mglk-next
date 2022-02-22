import {
	Form,
	Checkbox,
	Button,
	Label,
	Icon,
	Loader,
	Header,
	List,
	Popup,
	Modal,
} from 'semantic-ui-react';
import { HeaderIconSub } from '../base';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import PagePreview from '../../components/projects/PagePreview';

const ArchiveModal = ({ markedProjects, doRefresh }) => {
	const [open, setOpen] = useState(false);
	const DeleteProject = () => {
		return;
	};
	const RestoreProject = async ({ _id }) => {
		await fetch(`/api/projects/${_id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ archived: false }),
		});
		doRefresh();
		setOpen(false);
	};
	return (
		<>
			<Modal
				closeIcon
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				trigger={<Label.Detail as="a">View</Label.Detail>}
			>
				<Modal.Header>Archived Projects</Modal.Header>
				<Modal.Content>
					<List divided>
						{markedProjects?.map((project) => (
							<ProjectListItem key={project._id} project={project}>
								<Button
									color="teal"
									icon="undo"
									onClick={() => RestoreProject(project)}
								/>
								<Button color="red" icon="trash" />
							</ProjectListItem>
						))}
					</List>

					{/* <Modal.Description>project.description</Modal.Description> */}
					{/* <PagePreview project={project} /> */}
				</Modal.Content>
				{/* <Modal.Actions>
				<Button>Close</Button>
				<Button>Or click me</Button>
			</Modal.Actions> */}
			</Modal>
		</>
	);
};

// const ProjectModal = ({ project, doRefresh }) => {
// 	const [open, setOpen] = useState(false);
// 	const MarkForArchive = async () => {
// 		await fetch(`/api/projects/${project._id}`, {
// 			method: 'PUT',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ archived: true }),
// 		});
// 		doRefresh();
// 		setOpen(false);
// 	};
// 	return (
// 		<Modal
// 			closeIcon
// 			onClose={() => setOpen(false)}
// 			onOpen={() => setOpen(true)}
// 			open={open}
// 			trigger={<Button icon="setting" />}
// 		>
// 			<Modal.Header>
// 				{project.title}
// 				<Button
// 					color="green"
// 					floated="right"
// 					icon="paper plane outline"
// 					content="Publish"
// 				/>
// 				<Button
// 					color="teal"
// 					floated="right"
// 					icon="edit outline"
// 					content="Modify"
// 				/>

// 				<Button
// 					color="red"
// 					floated="right"
// 					icon="trash alternate outline"
// 					onClick={MarkForArchive}
// 				/>
// 			</Modal.Header>
// 			<Modal.Content>
// 				<Modal.Description>{project.description}</Modal.Description>
// 				<PagePreview project={project} />
// 			</Modal.Content>
// 			{/* <Modal.Actions>
// 				<Button>Close</Button>
// 				<Button>Or click me</Button>
// 			</Modal.Actions> */}
// 		</Modal>
// 	);
// };

const ProjectDates = ({ project }) => {
	return (
		<Popup
			trigger={
				<Label color="olive">
					<Moment format="L">{project.createdAt}</Moment>
				</Label>
			}
		>
			<div className="p-1">
				<Label basic>
					Created on <Moment format="LLLL">{project.createdAt}</Moment>
				</Label>
			</div>
			<div className="p-1">
				<Label basic>
					Updated on <Moment format="LLLL">{project.updatedAt}</Moment>
				</Label>
			</div>
		</Popup>
	);
};

const ProjectListItem = ({ project, children }) => (
	<List.Item key={project._id}>
		<List.Content floated="right">{children}</List.Content>
		<List.Content floated="left">
			<ProjectDates project={project} />
		</List.Content>
		<List.Content as="a" target="_blank" href={`/projects/${project._id}`}>
			<List.Header>{project.title}</List.Header>
			<List.Description>{project.description}</List.Description>
		</List.Content>
	</List.Item>
);

const Projects = () => {
	const [projects, setProjects] = useState();
	const [filteredProjects, setFilteredProjects] = useState();
	const doFetch = async () => {
		const response = await fetch('/api/projects').then((res) => res.json());
		const projectsNotArchived = response.data.filter((p) => !p.archived);
		setProjects(response.data);
		setFilteredProjects(projectsNotArchived);
	};
	useEffect(() => {
		doFetch();
	}, []);
	const TogglePublish = async ({ _id, published }) => {
		const isPublished = !!!published;
		await fetch(`/api/projects/${_id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ published: isPublished }),
		});
		doFetch();
	};
	const MarkForArchive = async ({ _id }) => {
		await fetch(`/api/projects/${_id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ archived: true }),
		});
		doFetch();
	};
	const ArchivedProjects = () => {
		const projectsArchived = projects?.filter((p) => p.archived === true);
		return (
			<>
				<Label size="large" horizontal>
					({projectsArchived?.length}) Projects Archived
					<ArchiveModal markedProjects={projectsArchived} doRefresh={doFetch} />
					{/* <Label.Detail as="a">View</Label.Detail> */}
				</Label>
			</>
		);
	};

	return (
		<>
			<Form.Field>
				<ArchivedProjects />
			</Form.Field>
			<List divided relaxed>
				{filteredProjects?.map((project) => (
					<ProjectListItem key={project._id} project={project}>
						{/* <ProjectModal project={project} doRefresh={doFetch} /> */}
						{project.published ? (
							<Button
								compact
								color="yellow"
								floated="right"
								icon="paper plane outline"
								onClick={() => TogglePublish(project)}
							/>
						) : (
							<Button
								compact
								color="green"
								floated="right"
								icon="paper plane outline"
								onClick={() => TogglePublish(project)}
							/>
						)}

						<Button
							compact
							as="a"
							href={`/projects/${project._id}/edit`}
							color="teal"
							floated="right"
							icon="edit outline"
						/>

						<Button
							compact
							color="black"
							floated="right"
							icon="archive"
							onClick={() => MarkForArchive(project)}
						/>
					</ProjectListItem>
				))}
			</List>
		</>
	);
};
export const ProjectEditor = () => {
	return (
		<Form className="bg-gray-100 p-4">
			<Form.Field>
				<Button
					floated="right"
					color="teal"
					icon="add"
					content="Create New"
					href="/projects/new"
				/>
				<HeaderIconSub
					content="Project Manager"
					icon="sticky note outline"
					sub="For all your Project Needs"
				/>
			</Form.Field>

			<Form.Field></Form.Field>
			<Form.Field>
				<Projects />
			</Form.Field>
		</Form>
	);
};
