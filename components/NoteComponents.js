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
	List,
	Message,
	Input,
	Checkbox,
	Modal,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const fetcher = (...args) => {
	return fetch(...args).then(async (res) => {
		const json = await res.json();
		//console.log(json);
		return json;
	});
};

const saver = (body) => {
	if (body._id) {
		return fetch(`/api/notes/${body._id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		}).then((res) => res.json());
	}
	return fetch('/api/notes', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	}).then((res) => res.json());
};
// if body has _id, put in id...

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
		source = '';
	}
	return (
		<div data-color-mode="light">
			<MarkdownComponent source={source} />
		</div>
	);
};

const MDEditor = ({ name, value, onChange }) => {
	return (
		<div data-color-mode="light">
			<MarkdownEditorComponent
				value={value}
				name={name}
				onChange={onChange}
				highlightEnable={true}
				//height="100vh"
			/>
		</div>
	);
};

export const NoteEditor = ({ data }) => {
	const [noteData, setNoteData] = useState(data);
	//console.log(noteData);
	const updateNoteData = async (e) => {
		// console.dir(e);
		// console.dir({ [e.target.name]: e.target.value });
		setNoteData({ ...noteData, [e.target.name]: e.target.value });
	};
	const performFirstSave = async () => {};

	return (
		<>
			<Container text>
				<Segment>
					<Form>
						<NoteOptions noteData={noteData} editMode={true} />
						<Form.Group grouped>
							<Form.Field>
								<Form.Input
									name="title"
									label="Title: "
									value={noteData?.title}
									onChange={updateNoteData}
								/>
								{noteData?.title && noteData?.title !== '' ? (
									<></>
								) : (
									<>
										<Label
											pointing
											basic
											color="orange"
											icon="question"
											detail="Include a Title for your note so that you can recognise it in
								lists"
										/>
									</>
								)}
							</Form.Field>

							<Message>
								<label>Options: </label>
								<Form.Field
									label="Include title in published note"
									control="input"
									type="checkbox"
									disabled
								/>
								<Form.Field
									label="Use encoded note title as publish url"
									control="input"
									type="checkbox"
									disabled
								/>
							</Message>
						</Form.Group>
					</Form>
					<Header as="h5">Contents:</Header>
					<div data-color-mode="light">
						<MarkdownEditorComponent
							value={noteData?.contents}
							onChange={(e) => {
								updateNoteData({ target: { name: 'contents', value: e } });
							}}
							highlightEnable={true}
							height="700px"
						/>
					</div>
				</Segment>
			</Container>
		</>
	);
};

const Library = () => {
	const { data, error } = useSWR('/api/notes', fetcher);
	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	const NotesList = data?.map((note) => {
		if (!note._id) return;
		return (
			<List.Item as="a" key={note._id} href={`/account/notes/${note._id}`}>
				<List.Icon name="file" size="large" verticalAlign="middle" />
				<List.Content>
					<List.Header>{note?.title}</List.Header>
					<List.Description>
						{` Updated `}
						<Moment date={note?.updatedAt} fromNow />
					</List.Description>
				</List.Content>
			</List.Item>
		);
	});
	return (
		<List divided relaxed>
			{NotesList}
		</List>
	);
};

const LibraryView = ({ notes }) => {
	if (!notes || notes.length == 0) return <></>;
	//console.log(notes);
	const NotesList = notes?.map((note) => {
		return (
			<List.Item as="a" key={note._id} href={`/account/notes/${note._id}/view`}>
				<List.Icon name="file" size="large" verticalAlign="middle" />
				<List.Content>
					<List.Header>{note?.title}</List.Header>
					<List.Description>
						{` Updated `}
						<Moment date={note?.updatedAt} fromNow />
					</List.Description>
				</List.Content>
			</List.Item>
		);
	});
	return (
		<List divided relaxed>
			{NotesList}
		</List>
	);
};

const ModalDeleteNote = ({ noteData, trigger }) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const submit = (e) => {
		e.preventDefault();
		fetch(`/api/notes/${noteData._id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(noteData),
		}).then((res) => res.json());
		setOpen(false);
		router.push('/account/notes');
		// delete this note from the archive
	};
	return (
		<Modal
			size="mini"
			className="flex flex-col justify-center "
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={trigger}
		>
			<Modal.Header>Deleting {noteData?.title}</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					Are you sure you want to delete this note?
					<Divider />
					Note _id: {noteData?._id}
				</Modal.Description>
			</Modal.Content>

			<Modal.Actions>
				<Button color="black" onClick={() => setOpen(false)}>
					No
				</Button>
				<Button
					content="Yes"
					labelPosition="right"
					icon="checkmark"
					onClick={submit}
					positive
				/>
			</Modal.Actions>
		</Modal>
	);
};

const NoteOptions = ({ noteData, editMode }) => {
	const router = useRouter();
	const { title, updatedAt, _id } = noteData || '';
	const saveNote = async () => {
		console.dir(noteData);
		const resp = await saver(noteData);
		console.log(resp);
		router.push(`/account/notes/${resp._id}/edit`);
	};

	return (
		<>
			<Header as="h4">
				<Icon name="file" />
				<Header.Content>
					{title ? title : 'New Note'}
					<Header.Subheader>
						{updatedAt ? (
							<>
								{` Updated `}
								<Moment date={updatedAt} fromNow />{' '}
							</>
						) : (
							<>Not Saved!</>
						)}
					</Header.Subheader>
				</Header.Content>
			</Header>
			<Button icon="angle double left" onClick={() => router.back()} />
			{!editMode ? (
				<>
					<Dropdown
						trigger={<Button icon="ellipsis horizontal"></Button>}
						direction="left"
						item
						icon=""
					>
						<Dropdown.Menu>
							<Dropdown.Item as="a" href={`./${_id}/edit`}>
								<Icon name="edit" />
								{`Modify`}
							</Dropdown.Item>
							<Dropdown.Item>
								<Icon name="archive" />
								{`Send to Archive`}
							</Dropdown.Item>
							<ModalDeleteNote
								noteData={noteData}
								trigger={
									<Dropdown.Item>
										<Icon name="trash" />
										{`Delete`}
									</Dropdown.Item>
								}
							/>
						</Dropdown.Menu>
					</Dropdown>

					<Divider />
				</>
			) : (
				<>
					<Button
						floated="right"
						icon="save"
						content="Save"
						onClick={() => saveNote()}
					/>
				</>
			)}
		</>
	);
};

export const NoteEditorView = ({ _id }) => {
	const { data, error } = useSWR(`/api/notes/${_id ? _id : 'new'}`, fetcher);
	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	return (
		<>
			<NoteEditor data={data} />
		</>
	);
};

export const NoteView = ({ _id = 'undefined' }) => {
	const { data, error } = useSWR(`/api/notes/${_id}`, fetcher);
	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	//console.log(data);
	return (
		<>
			<Container text className="pt-10">
				<Segment className="overflow-x-scroll">
					<NoteOptions noteData={data} />
					<MDPreview source={data.contents} />
				</Segment>
			</Container>
		</>
	);
};

export const IndexView = () => {
	// just show an index of all notes
	return (
		<>
			<Container text className="pt-10">
				<Segment>
					<Menu secondary fluid>
						<Menu.Item>
							<Header as="h3" content="Your Notes" />
						</Menu.Item>
						<Menu.Item position="right">
							<Button
								content="New"
								icon="plus"
								as="a"
								href="/account/notes/new"
							/>
						</Menu.Item>
					</Menu>

					<Library />
				</Segment>
			</Container>
		</>
	);
};
