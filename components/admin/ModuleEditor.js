import {
	Form,
	Checkbox,
	Button,
	Label,
	Icon,
	Container,
	Segment,
	Grid,
	Header,
	Menu,
	Placeholder,
	Modal,
	Input,
	Divider,
	TextArea,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { FormHeader } from '../forms/FormComponents';

const ModulesEditor = ({ mode, module, createModule, updateModule }) => {
	const [createdModule, setCreatedModule] = useState(module || {});
	const [open, setOpen] = useState(false);
	const handleChange = (e) => {
		setCreatedModule({
			...createdModule,
			[e.target.name]: e.target.value,
		});
	};
	switch (mode) {
		case 'create':
			return (
				<Modal
					size="mini"
					className="flex flex-col justify-center "
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={
						<Button
							size="small"
							content="New"
							icon="plus"
							labelPosition="right"
						/>
					}
				>
					<Modal.Header>Create a Module</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<Form.Field>
									<Input
										label="Name"
										name="name"
										onChange={handleChange}
										placeholder="Module Name"
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Icon"
										icon="wrench"
										name="icon"
										onChange={handleChange}
										placeholder="wrench"
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<TextArea
										name="description"
										onChange={handleChange}
										placeholder="Module Description"
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Public path"
										name="path"
										onChange={handleChange}
										placeholder={`/`}
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="API path"
										name="apiPath"
										onChange={handleChange}
										placeholder={`/`}
										fluid
									/>
								</Form.Field>
							</Form>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="black" onClick={() => setOpen(false)}>
							Back
						</Button>
						<Button
							content="Create"
							labelPosition="right"
							icon="checkmark"
							onClick={() => {
								createModule(createdModule);
								setOpen(false);
							}}
							positive
						/>
					</Modal.Actions>
				</Modal>
			);
		case 'update':
			return (
				<Modal
					size="mini"
					className="flex flex-col justify-center "
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={
						<Button
							size="tiny"
							color="teal"
							content="Edit"
							icon="edit outline"
							labelPosition="right"
						/>
					}
				>
					<Modal.Header>Editing {createdModule.name}</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<Form.Field>
									<Input
										label="Name"
										name="name"
										onChange={handleChange}
										placeholder="Module Name"
										defaultValue={createdModule.name}
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Icon"
										icon="wrench"
										name="icon"
										defaultValue={createdModule.icon}
										onChange={handleChange}
										placeholder="wrench"
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<TextArea
										name="description"
										defaultValue={createdModule.description}
										onChange={handleChange}
										placeholder="Module Description"
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="Public path"
										name="path"
										defaultValue={createdModule.path}
										onChange={handleChange}
										placeholder={`/`}
										fluid
									/>
								</Form.Field>
								<Form.Field>
									<Input
										label="API path"
										name="apiPath"
										defaultValue={createdModule.apiPath}
										onChange={handleChange}
										placeholder={`/`}
										fluid
									/>
								</Form.Field>
							</Form>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="black" onClick={() => setOpen(false)}>
							Back
						</Button>
						<Button
							content="Update"
							labelPosition="right"
							icon="checkmark"
							onClick={() => {
								updateModule(createdModule);
								setOpen(false);
							}}
							positive
						/>
					</Modal.Actions>
				</Modal>
			);
		default:
			return null;
	}
};

export const ModulesComponent = () => {
	const [modules, setModules] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const createModule = async (body) => {
		const resp = await fetch('/api/modules', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const response = await resp.json();
		console.log(response);
		setRefresh(true);
	};
	const updateModule = async (body) => {
		const resp = await fetch(`/api/modules/${body._id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		//const response = await resp.json();
		//console.log(response);
		setRefresh(true);
	};
	const deleteModule = async (_id) => {
		const resp = await fetch(`/api/modules/${_id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const response = await resp.json();
		setRefresh(true);
	};

	const fetchModules = async () => {
		const resp = await fetch('/api/modules');
		const response = await resp.json();
		console.log(response.data);
		setModules(response.data);
		setRefresh(false);
	};
	useEffect(() => {
		fetchModules();
	}, []);
	if (refresh) {
		fetchModules();
	}

	return (
		<Form>
			<Segment>
				<Form.Field>
					<FormHeader
						content={`Modules`}
						icon="wrench"
						sub="The Front End for your content!"
						divider
					/>
				</Form.Field>

				<Form.Field>
					<ModulesEditor mode="create" createModule={createModule} />
				</Form.Field>
				<Form.Field className="pt-2">
					<ModulesList
						updateModule={updateModule}
						modules={modules}
						deleteModule={deleteModule}
					/>
				</Form.Field>
			</Segment>
		</Form>
	);
};

const ConfirmModuleDeletion = ({ module, deleteModule }) => {
	const [open, setOpen] = useState(false);
	return (
		<Modal
			size="mini"
			className="flex flex-col justify-center "
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Button
					size="tiny"
					content="Delete"
					icon="trash"
					labelPosition="right"
					color="red"
				/>
			}
		>
			<Modal.Header>Delete Module</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<p>Are you sure you want to delete this module?</p>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => setOpen(false)}>
					Back
				</Button>
				<Button
					content="Delete"
					labelPosition="right"
					icon="trash"
					onClick={() => {
						deleteModule(module._id);
						setOpen(false);
					}}
					color="red"
				/>
			</Modal.Actions>
		</Modal>
	);
};

const ModulesList = ({ modules, deleteModule, updateModule }) => {
	return (
		<>
			{modules.map((module) => {
				return (
					<Segment key={module._id}>
						<Header as="h3">
							<Icon name={module.icon} />
							<Header.Content>{module.name}</Header.Content>

							<Header.Subheader>
								<p>{module.description}</p>
							</Header.Subheader>
						</Header>
						<Label attached="bottom right">
							_id: <Label.Detail>{module._id}</Label.Detail>
						</Label>
						<Form>
							<Form.Group>
								<Label>
									Client Access Path:<Label.Detail>{module.path}</Label.Detail>
								</Label>
								<Label>
									API Access Path:<Label.Detail>{module.apiPath}</Label.Detail>
								</Label>
							</Form.Group>
						</Form>
						<Form.Field>
							<Header as="h5">Roles</Header>
							(No Roles Assigned)
						</Form.Field>
						<Form.Field label="Controls"></Form.Field>
						<ModulesEditor
							mode="update"
							module={module}
							updateModule={updateModule}
						/>
						<ConfirmModuleDeletion
							module={module}
							deleteModule={deleteModule}
						/>

						<Grid columns={2}>
							<Grid.Column width={12}></Grid.Column>
							<Grid.Column width={4} textAlign="right"></Grid.Column>
						</Grid>
					</Segment>
				);
			})}
		</>
	);
};
