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

const NotesEditor = ({ mode, note, createNote, updateNote }) => {
	const [createdNote, setCreatedNote] = useState(note || {});
	const [open, setOpen] = useState(false);
	const handleChange = (e) => {
		setCreatedNote({
			...createdNote,
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
					<Modal.Header>Create a Note</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<Form.Field>
									<Input
										label="Name"
										name="name"
										onChange={handleChange}
										placeholder="Note Name"
										fluid
									/>
								</Form.Field>

								<Form.Field>
									<TextArea
										name="description"
										onChange={handleChange}
										placeholder="Note Description"
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
								createNote(createdNote);
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
					<Modal.Header>Editing {createdNote.name}</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Form>
								<Form.Field>
									<Input
										label="Name"
										name="name"
										onChange={handleChange}
										placeholder="Note Name"
										defaultValue={createdNote.name}
										fluid
									/>
								</Form.Field>

								<Form.Field>
									<TextArea
										name="description"
										defaultValue={createdNote.description}
										onChange={handleChange}
										placeholder="Note Description"
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
								updateNote(createdNote);
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

export const NotesComponent = () => {
	const [notes, setNotes] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const createNote = async (body) => {
		const resp = await fetch('/api/notes', {
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
	const updateNote = async (body) => {
		const resp = await fetch(`/api/notes/${body._id}`, {
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
	const deleteNote = async (_id) => {
		const resp = await fetch(`/api/notes/${_id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		const response = await resp.json();
		setRefresh(true);
	};

	const fetchNotes = async () => {
		const resp = await fetch('/api/notes');
		const response = await resp.json();
		console.log(response.data);
		setNotes(response.data);
		setRefresh(false);
	};
	useEffect(() => {
		fetchNotes();
	}, []);
	if (refresh) {
		fetchNotes();
	}

	return (
		<Form>
			<Segment>
				<Form.Field>
					<FormHeader content={`Notes`} icon="file" sub="" divider />
				</Form.Field>

				<Form.Field>
					<NotesEditor mode="create" createNote={createNote} />
				</Form.Field>
				<Form.Field className="pt-2">
					<NotesList
						updateNote={updateNote}
						notes={notes}
						deleteNote={deleteNote}
					/>
				</Form.Field>
			</Segment>
		</Form>
	);
};

const ConfirmNoteDeletion = ({ note, deleteNote }) => {
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
			<Modal.Header>Delete Note</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<p>Are you sure you want to delete this note?</p>
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
						deleteNote(note._id);
						setOpen(false);
					}}
					color="red"
				/>
			</Modal.Actions>
		</Modal>
	);
};

const NotesList = ({ notes, deleteNote, updateNote }) => {
	return (
		<>
			{notes.map((note) => {
				return (
					<Segment key={note._id}>
						<Header as="h3">
							<Header.Content>{note.name}</Header.Content>

							<Header.Subheader>
								<p>{note.description}</p>
							</Header.Subheader>
						</Header>
						<Label attached="bottom right">
							_id: <Label.Detail>{note._id}</Label.Detail>
						</Label>

						<NotesEditor mode="update" note={note} updateNote={updateNote} />
						<ConfirmNoteDeletion note={note} deleteNote={deleteNote} />
					</Segment>
				);
			})}
		</>
	);
};
