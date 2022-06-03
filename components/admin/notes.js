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
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

export const NotesComponent = ({ archived = false }) => {
	const [notes, setNotes] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [archivedCount, setArchivedCount] = useState(0);
	const router = useRouter();
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
		//console.log(response);
		setRefresh(true);
	};
	const toggleArchived = async (_id, archived) => {
		//console.log(`updateNote: ${_id}`);
		await updateNote({ _id, archived });
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
	const countArchivedNotes = async () => {
		const archivedCountResp = await fetch(`/api/notes/archive`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ count: true }),
		});
		const archivedCount = await archivedCountResp.json();
		setArchivedCount(archivedCount.data);
	};
	const fetchNotes = async () => {
		let resp;
		if (archived) {
			resp = await fetch('/api/notes/archive');
		} else {
			resp = await fetch('/api/notes/');
		}
		const response = await resp.json();
		//console.log(response.data);
		setNotes(response.data);
		setRefresh(false);
	};
	useEffect(() => {
		countArchivedNotes();
		fetchNotes();
	}, []);
	if (refresh) {
		countArchivedNotes();
		fetchNotes();
	}

	return (
		<Form>
			<Segment padded>
				<Form.Field>
					<FormHeader
						content={archived ? 'Notes Archive' : 'Active Notes'}
						icon="file"
						sub=""
						divider
					/>
				</Form.Field>

				<Form.Field>
					{archived ? (
						<>
							<Button
								// size="tiny"
								content="Back"
								icon="left arrow"
								labelPosition="left"
								onClick={() => router.push('/admin/notes')}
							/>
						</>
					) : (
						<>
							<NotesEditor mode="create" createNote={createNote} />
						</>
					)}
				</Form.Field>
				<Form.Field className="pt-2">
					<NotesList
						updateNote={updateNote}
						notes={notes}
						deleteNote={deleteNote}
						archived={archived}
						toggleArchived={toggleArchived}
					/>
				</Form.Field>
				{archived ? (
					<></>
				) : (
					<>
						<Label>
							There are <b>{archivedCount}</b> more notes in your archive. (
							<Link href="/admin/notes/archive">
								<a>view</a>
							</Link>
							)
						</Label>
					</>
				)}
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

const NotesList = ({
	notes,
	deleteNote,
	updateNote,
	archived = false,
	toggleArchived,
}) => {
	return (
		<>
			{notes.map((note) => {
				const { _id } = note;
				return (
					<Segment key={note._id} style={{ paddingBottom: '3em' }}>
						<Header as="h3">
							<Header.Content>{note.name}</Header.Content>

							<Header.Subheader>
								<Moment format="DD-MM-YYYY @HH:mm" date={note.createdAt} />
								{` -> `}
								<Moment date={note.createdAt} fromNow />
							</Header.Subheader>
						</Header>
						<Label attached="bottom right">
							_id: <Label.Detail>{note._id}</Label.Detail>
						</Label>
						<p>{note.description}</p>

						{archived ? (
							<>
								<Button
									size="tiny"
									color="green"
									content="Restore"
									icon="edit outline"
									labelPosition="right"
									onClick={() => {
										toggleArchived(note._id, !!!note.archived);
									}}
								/>
								<ConfirmNoteDeletion note={note} deleteNote={deleteNote} />
							</>
						) : (
							<>
								<NotesEditor
									mode="update"
									note={note}
									updateNote={updateNote}
								/>
								<Button
									size="tiny"
									color="grey"
									content="Archive"
									icon="edit outline"
									labelPosition="right"
									onClick={() => {
										toggleArchived(note._id, !!!note.archived);
									}}
								/>
							</>
						)}
					</Segment>
				);
			})}
		</>
	);
};
