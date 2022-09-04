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
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

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

export const NewNote = () => {
	const [noteData, setNoteData] = useState({});
	const updateNoteData = async (e) => {
		// console.dir(e);
		// console.dir({ [e.target.name]: e.target.value });
		setNoteData({ ...noteData, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Container text>
				<Segment>
					<Form>
						<Header as="h4">
							<Icon name="file" />
							New Note
						</Header>
						<Form.Group grouped>
							<Form.Field>
								<Form.Input
									name="title"
									label="Title: "
									onChange={updateNoteData}
								/>
								{noteData.title && noteData.title !== '' ? (
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
								/>
								<Form.Field
									label="Use encoded note title as publish url"
									control="input"
									type="checkbox"
								/>
							</Message>
						</Form.Group>
					</Form>
					<Header as="h5">Contents:</Header>
					<div data-color-mode="light">
						<MarkdownEditorComponent
							value={noteData.content}
							onChange={(e) => {
								updateNoteData({ target: { name: 'content', value: e } });
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

const fetchNotes = async (id) => {
	if (!id) {
		const d = await fetch('/api/notes').then((res) => res.json());
		if (d.success) return d.data;
	}
	const d2 = await fetch(`/api/notes/${id}`).then((res) => res.json());
	if (d2.success) return d2.data;
	//console.log(json);
};

const NoteOptions = ({ title, updatedAt }) => {
	const router = useRouter();
	return (
		<Menu color={`grey`} inverted attached="top" compact secondary>
			<Menu.Item icon="angle double left" onClick={() => router.back()} />
			<Menu.Item>
				<Header as="h2" inverted>
					{title}

					<Header.Subheader>
						{` Updated `}
						<Moment date={updatedAt} fromNow />
					</Header.Subheader>
				</Header>
			</Menu.Item>
			<Menu.Item position="right">
				<Dropdown item icon="ellipsis horizontal">
					<Dropdown.Menu>
						<Dropdown.Item>
							<Icon name="edit" />
							{`Modify`}
						</Dropdown.Item>
						<Dropdown.Item>
							<Icon name="archive" />
							{`Send to Archive`}
						</Dropdown.Item>
						<Dropdown.Item>
							<Icon name="trash" />
							{`Delete`}
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		</Menu>
	);
};

export const NoteView = ({ _id }) => {
	const { data, error } = useSWR(`/api/notes/${_id}`, fetcher);
	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;
	//console.log(data);
	return (
		<Container text className="pt-10">
			<NoteOptions title={data.title} updatedAt={data.updatedAt} />
			<Segment attached="bottom">
				<MDPreview source={data.contents} />
			</Segment>
		</Container>
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
