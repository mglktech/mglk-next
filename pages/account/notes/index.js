import { DefaultLayout } from '../../../layouts/DefaultLayout';
import {
	Container,
	Segment,
	Card,
	Icon,
	Header,
	Button,
	Placeholder,
	Form,
	TextArea,
	Label,
	Dropdown,
	Divider,
	Popup,
	Menu,
} from 'semantic-ui-react';
import dynamic from 'next/dynamic';
// import '@uiw/react-markdown-editor/markdown-editor.css';
// import '@uiw/react-markdown-preview/markdown.css';
//import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import Moment from 'react-moment';

import { IndexView } from '../../../components/NoteComponents';

const MarkdownEditorComponent = dynamic(
	() => import('@uiw/react-md-editor').then((mod) => mod.default),
	{
		ssr: false,
	}
);

const MarkdownComponent = dynamic(
	() => import('@uiw/react-markdown-preview').then((mod) => mod.default),
	{ ssr: false }
);

const MDPreview = ({ source }) => {
	if (typeof source !== 'string') {
		source = "You didn't pass a string as source";
	}
	return (
		<div data-color-mode="light">
			<MarkdownComponent source={source} />
		</div>
	);
};

const MDEditor = ({ value, onChange }) => {
	return (
		<div data-color-mode="light">
			<MarkdownEditorComponent
				value={value}
				onChange={onChange}
				highlightEnable={true}
				height="100vh"
			/>
		</div>
	);
};

const NoteCard = ({ note }) => {
	const router = useRouter();
	return (
		<Card
			raised={true}
			style={{
				maxHeight: '400px',
				overflow: 'clip',
			}}
		>
			<Card.Content as="a" href={'/account/notes?action=view&id=' + note._id}>
				<Card.Header className="pr-5">
					<Header as="h3">{note?.title}</Header>
				</Card.Header>
				<Card.Meta>
					<Moment format="DD-MM-YYYY @HH:mm" date={note?.createdAt} />
					{` -> `}
					<Moment date={note?.createdAt} fromNow />
				</Card.Meta>
				<Card.Description>
					<div data-color-mode="light" className="pb-2">
						<MDPreview source={note?.contents} />
					</div>
				</Card.Description>
			</Card.Content>
			<Label attached="top right">
				<Dropdown direction="left" item icon="bars">
					<Dropdown.Menu>
						{note?.archived ? (
							<>
								<Dropdown.Item
									onClick={() => {
										toggleArchived(note._id, !!!note.archived);
									}}
								>
									Restore
								</Dropdown.Item>
								<Dropdown.Item>Delete Permanently</Dropdown.Item>
							</>
						) : (
							<>
								<Dropdown.Item
									onClick={() =>
										router.push(`/account/notes?action=edit&id=${note._id}`)
									}
								>
									Edit
								</Dropdown.Item>
								<Dropdown.Item
									onClick={() => {
										toggleArchived(note._id, !!!note.archived);
									}}
								>
									Archive
								</Dropdown.Item>
							</>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Label>
		</Card>
	);
};

const NoteCardGroup = ({ notes }) => {
	return (
		<>
			{notes ? (
				<>
					<Card.Group centered>
						{notes.map((note) => {
							return <NoteCard key={note._id} note={note} />;
						})}
					</Card.Group>
				</>
			) : (
				<>loading...</>
			)}
		</>
	);
};

// const NotesMenu = ({ archived = false }) => {
// 	const [notes, setNotes] = useState(['']);
// 	const [refresh, setRefresh] = useState(false);
// 	const [archivedCount, setArchivedCount] = useState(0);
// 	const toggleArchived = async (_id, archived) => {
// 		//console.log(`updateNote: ${_id}`);
// 		await updateNote({ _id, archived });
// 		setRefresh(true);
// 	};
// 	const updateNote = async (body) => {
// 		const resp = await fetch(`/api/notes/${body._id}`, {
// 			method: 'PUT',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(body),
// 		});
// 		//const response = await resp.json();
// 		//console.log(response);
// 		setRefresh(true);
// 	};
// 	const deleteNote = async (_id) => {
// 		const resp = await fetch(`/api/notes/${_id}`, {
// 			method: 'DELETE',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 		const response = await resp.json();
// 		setRefresh(true);
// 	};
// 	const countArchivedNotes = async () => {
// 		const archivedCountResp = await fetch(`/api/notes/archive`, {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ count: true }),
// 		});
// 		const archivedCount = await archivedCountResp.json();
// 		setArchivedCount(archivedCount.data);
// 	};
// 	const fetchNotes = async () => {
// 		let resp;
// 		if (archived) {
// 			resp = await fetch('/api/notes/archive');
// 		} else {
// 			resp = await fetch('/api/notes/');
// 		}
// 		const response = await resp.json();
// 		//console.log(response.data);
// 		setNotes(response.data);
// 		setRefresh(false);
// 	};
// 	useEffect(() => {
// 		countArchivedNotes();
// 		fetchNotes();
// 	}, []);
// 	if (refresh) {
// 		countArchivedNotes();
// 		fetchNotes();
// 	}
// 	return (
// 		<Container className="mt-5">
// 			<Segment>
// 				<Header content="Your Notes" as="h1" />
// 				<Button
// 					icon="plus"
// 					content="Create a Note"
// 					as="a"
// 					href="/account/notes?action=create"
// 				/>
// 				<Divider />
// 				<NoteCardGroup notes={notes} />
// 				<Divider />
// 				{archived ? (
// 					<></>
// 				) : (
// 					<>
// 						<Label>
// 							There are <b>{archivedCount}</b> more notes in your archive. (
// 							<Link href="/account/notes/archive">
// 								<a>view</a>
// 							</Link>
// 							)
// 						</Label>
// 					</>
// 				)}
// 			</Segment>
// 		</Container>
// 	);
// };
const CreateNote = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [createdNote, setCreatedNote] = useState({
		author: session?.user?._id,
	});
	const handleChange = (e) => {
		console.log(e);
		setCreatedNote({
			...createdNote,
			[e.target.name]: e.target.value,
		});
	};
	const doNoteCreation = async () => {
		const resp = await fetch('/api/notes', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(createdNote),
		});
		const response = await resp.json();
		//console.log(response);
		if (response?.success === true && response._id) {
			router.push(`/account/notes?action=edit&id=${response._id}`);
		}
		// goto edit note with id
	};
	// Create a new note with a unique ID and a given title
	// Ensure note author is the current user ID
	// API returns ID of new note and redirects to edit page
	return (
		<Container text className="mt-5">
			<Header as="h1">Name your new note</Header>
			<Segment>
				<Form>
					<Form.Input
						name="title"
						size="huge"
						placeholder="Enter Title"
						onChange={handleChange}
					/>

					<Form.Button content="Create" onClick={() => doNoteCreation()} />
				</Form>
			</Segment>
		</Container>
	);
};
const ViewContent = ({ note }) => {
	return (
		<>
			<Container>
				<Segment raised>
					<MDPreview source={note?.contents} />
				</Segment>
			</Container>
		</>
	);
};
const EditNote = ({ editorContentsValue, setEditorContentsValue }) => {
	// then execute func with no arguments
	return (
		<Container>
			<Segment></Segment>
		</Container>
	);
};
const DeleteNote = ({ id }) => {
	return <Segment>Delete Note {id}</Segment>;
};

const Main = ({
	query,
	noteData,
	setNoteData,
	notes,
	setRefresh,
	editorContentsValue,
	setEditorContentsValue,
}) => {
	const { action, id } = query;

	const toggleArchived = async (_id, archived) => {
		//console.log(`updateNote: ${_id}`);
		await updateNote({ _id, archived });
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

	const ArchiveView = async () => {
		const notes = await fetch('/api/notes/archive').then((res) => res.json());
		return (
			<>
				<NoteCardGroup notes={notes} />
			</>
		);
	};

	useEffect(() => {
		if (noteData) {
			setEditorContentsValue(noteData.contents);
		}
	}, [noteData]);

	switch (action) {
		case 'create':
			return <CreateNote />;
		case 'edit':
			return (
				<>
					<Container>
						<MDEditor
							value={editorContentsValue}
							onChange={setEditorContentsValue}
						/>
					</Container>
				</>

				// <EditNote
				// 	editorContentsValue={editorContentsValue}
				// 	setEditorContentsValue={setEditorContentsValue}
				// />
			);
		case 'delete':
			return <DeleteNote note={noteData} func={deleteNote} />;
		case 'view':
			return <ViewContent note={noteData} />;
		case 'archive':
			return (
				<>
					<ArchiveView />
				</>
			);
		default:
			return (
				<>
					<IndexView />
					{/* <NoteCardGroup notes={notes} /> */}
				</>
			);
	}
};
const MainMenuItems = ({
	action,
	noteData,
	editorContentsValue,
	updateNote,
	archivedCount,
}) => {
	switch (action) {
		case 'view':
			return (
				<>
					<Menu.Item
						icon="arrow alternate circle left"
						content="Back to Notes"
						as="a"
						href="notes"
					/>
					<Menu.Item
						icon="plus"
						content="Create a Note"
						as="a"
						href="/account/notes?action=create"
					/>
					<Menu.Item
						icon="wrench"
						content="Edit"
						as="a"
						href={`notes?action=edit&id=` + noteData?._id}
					/>
				</>
			);
		case 'edit':
			return (
				<>
					<Menu.Item
						icon="arrow alternate circle left"
						content="Back to Notes"
						as="a"
						href="notes"
					/>
					<Popup
						trigger={
							<Menu.Item
								position="right"
								icon="save"
								content={
									editorContentsValue === noteData?.contents ? `Saved!` : `Save`
								}
								disabled={editorContentsValue === noteData?.contents}
								onClick={() => {
									updateNote({
										contents: editorContentsValue,
									});
								}}
							/>
						}
					></Popup>
				</>
			);
		default:
			return (
				<>
					<Menu.Item
						icon="plus"
						content="Create a Note"
						as="a"
						href="/account/notes?action=create"
					/>
					<Menu.Item
						position="right"
						as="a"
						href="?action=archive"
						icon="archive"
						content={`Archive (${archivedCount})`}
					/>
				</>
			);
	}
};
// const Notes = ({ query }) => {
// 	/* Possible URL Params:
// 	- action: the action to perform on the note
// 	- id: the id of the note to perform the action on
// 	- No Params: show all notes
// 	*/
// 	const { action, id } = query;
// 	const [noteData, setNoteData] = useState({});
// 	const fetchNoteData = async (id) => {
// 		const resp = await fetch(`/api/notes/${id}`).then((res) => res.json());
// 		setNoteData(resp.contents);
// 	};
// 	useEffect(() => {
// 		if (id) {
// 			fetchNoteData(id);
// 		}
// 	}, [id]);
// 	switch (action) {
// 		case 'create':
// 			return <CreateNote />;
// 		case 'edit':
// 			return <EditNote id={id} />;
// 		case 'delete':
// 			return <DeleteNote id={id} />;
// 		case 'view':
// 			return <ViewContent id={id} />;
// 		default:
// 			return <NotesMenu />;
// 	}
// };
const MainContainer = ({ query }) => {
	const { action, id } = query;
	const [archivedCount, setArchivedCount] = useState(0);
	const [editorContentsValue, setEditorContentsValue] = useState('');
	const [refresh, setRefresh] = useState(false);
	const [noteData, setNoteData] = useState({});
	const [notes, setNotes] = useState([]);
	const fetchNotes = async (archive) => {
		let res;
		if (archive) {
			res = await fetch('/api/notes/archive').then((res) => res.json());
		}
		res = await fetch('/api/notes/').then((res) => res.json());
		setNotes(res.data);
		setRefresh(false);
	};
	const fetchNoteData = async (id) => {
		const resp = await fetch(`/api/notes/${id}`).then((res) => res.json());
		// console.log(resp.data[0]);
		setNoteData(resp.data);
	};
	const countArchivedNotes = async () => {
		const r = await fetch(`/api/notes/archive`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ count: true }),
		}).then((res) => res.json());
		setArchivedCount(r.data);
	};
	const updateNote = async (updatedNoteData) => {
		const resp = await fetch(`/api/notes/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedNoteData),
		});
		const response = await resp.json();
		console.log(response);
		setRefresh(true);
	};

	useEffect(() => {
		if (query.id) {
			fetchNoteData(query.id);
		} else {
			fetchNotes();
		}
		countArchivedNotes();
	}, [query]);
	if (refresh) {
		if (id) {
			fetchNoteData(id);
		} else {
			fetchNotes();
		}
		setRefresh(false);
	}

	return (
		<DefaultLayout>
			<IndexView />
			{/* <Container fluid className="mt-7 p-5">
				<Header content="Your Notes" as="h1" />
				<Menu>
					<MainMenuItems
						action={action}
						noteData={noteData}
						editorContentsValue={editorContentsValue}
						updateNote={updateNote}
						archivedCount={archivedCount}
					/>
				</Menu>

				<Main
					query={query}
					noteData={noteData}
					notes={notes}
					setRefresh={setRefresh}
					editorContentsValue={editorContentsValue}
					setEditorContentsValue={setEditorContentsValue}
				/>
				<Divider />
				<Label>
					There are <b>{archivedCount}</b> more notes in your archive. (
					<Link href="/account/notes/archive">
						<a>view</a>
					</Link>
					)
				</Label>
			</Container> */}
		</DefaultLayout>
	);
};

MainContainer.getInitialProps = async (ctx) => {
	const { query } = ctx;

	return { query };
};

export default MainContainer;
