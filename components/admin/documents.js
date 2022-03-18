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

const ArchiveModal = ({ markedDocuments, doRefresh }) => {
	const [open, setOpen] = useState(false);
	const DeleteDocument = async ({ _id }) => {
		const result = await fetch(`/api/documents/${_id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		console.log(result);
		doRefresh();
	};
	const RestoreDocument = async ({ _id }) => {
		await fetch(`/api/documents/${_id}`, {
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
				<Modal.Header>Archived Documents</Modal.Header>
				<Modal.Content>
					<List divided>
						{markedDocuments?.map((document) => (
							<DocumentListItem key={document._id} document={document}>
								<Button
									color="teal"
									icon="undo"
									onClick={() => RestoreDocument(document)}
								/>
								<Button
									color="red"
									icon="trash"
									onClick={() => DeleteDocument(document)}
								/>
							</DocumentListItem>
						))}
					</List>

					{/* <Modal.Description>document.description</Modal.Description> */}
					{/* <PagePreview document={document} /> */}
				</Modal.Content>
				{/* <Modal.Actions>
				<Button>Close</Button>
				<Button>Or click me</Button>
			</Modal.Actions> */}
			</Modal>
		</>
	);
};

// const DocumentModal = ({ document, doRefresh }) => {
// 	const [open, setOpen] = useState(false);
// 	const MarkForArchive = async () => {
// 		await fetch(`/api/documents/${document._id}`, {
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
// 				{document.title}
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
// 				<Modal.Description>{document.description}</Modal.Description>
// 				<PagePreview document={document} />
// 			</Modal.Content>
// 			{/* <Modal.Actions>
// 				<Button>Close</Button>
// 				<Button>Or click me</Button>
// 			</Modal.Actions> */}
// 		</Modal>
// 	);
// };

const DocumentDates = ({ document }) => {
	return (
		<Popup
			trigger={
				<Label color="olive">
					<Moment format="L">{document.createdAt}</Moment>
				</Label>
			}
		>
			<div className="p-1">
				<Label basic>
					Created on <Moment format="LLLL">{document.createdAt}</Moment>
				</Label>
			</div>
			<div className="p-1">
				<Label basic>
					Updated on <Moment format="LLLL">{document.updatedAt}</Moment>
				</Label>
			</div>
		</Popup>
	);
};

const DocumentListItem = ({ document, children }) => (
	<List.Item key={document._id}>
		<List.Content floated="right">{children}</List.Content>
		<List.Content floated="left">
			<DocumentDates document={document} />
		</List.Content>
		<List.Content as="a" target="_blank" href={`/documents/${document._id}`}>
			<List.Header>{document.title}</List.Header>
			<List.Description>{document.description}</List.Description>
		</List.Content>
	</List.Item>
);

const Documents = () => {
	const [documents, setDocuments] = useState();
	const [filteredDocuments, setFilteredDocuments] = useState();
	const doFetch = async () => {
		const res = await fetch('/api/documents');
		const data = await res.json();
		//const response = await fetch('/api/documents').then((res) => res.json());
		if (res.ok) {
			//const documentsNotArchived = data ? data.filter((p) => !p.archived) : null;
			setDocuments(data);
			//setFilteredDocuments(documentsNotArchived);
			return;
		}
	};
	useEffect(() => {
		doFetch();
	}, []);
	// const TogglePublish = async ({ _id, published }) => {
	// 	const isPublished = !!!published;
	// 	await fetch(`/api/documents/${_id}`, {
	// 		method: 'PUT',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ published: isPublished }),
	// 	});
	// 	doFetch();
	// };
	// const MarkForArchive = async ({ _id }) => {
	// 	await fetch(`/api/documents/${_id}`, {
	// 		method: 'PUT',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ archived: true }),
	// 	});
	// 	doFetch();
	// };
	// const ArchivedDocuments = () => {
	// 	const documentsArchived = documents?.filter((p) => p.archived === true);
	// 	return (
	// 		<>
	// 			<Label size="large" horizontal>
	// 				({documentsArchived?.length}) Documents Archived
	// 				<ArchiveModal
	// 					markedDocuments={documentsArchived}
	// 					doRefresh={doFetch}
	// 				/>
	// 				{/* <Label.Detail as="a">View</Label.Detail> */}
	// 			</Label>
	// 		</>
	// 	);
	// };

	return (
		<>
			<Form.Field>{/* <ArchivedDocuments /> */}</Form.Field>
			<List divided relaxed>
				{documents?.map((document) => (
					<DocumentListItem key={document._id} document={document}>
						{/* <DocumentModal document={document} doRefresh={doFetch} /> */}
						{document.published ? (
							<Button
								compact
								color="yellow"
								floated="right"
								icon="paper plane outline"
								onClick={() => TogglePublish(document)}
							/>
						) : (
							<Button
								compact
								color="green"
								floated="right"
								icon="paper plane outline"
								onClick={() => TogglePublish(document)}
							/>
						)}

						<Button
							compact
							as="a"
							href={`/documents/${document._id}/edit`}
							color="teal"
							floated="right"
							icon="edit outline"
						/>

						<Button
							compact
							color="black"
							floated="right"
							icon="archive"
							onClick={() => MarkForArchive(document)}
						/>
					</DocumentListItem>
				))}
			</List>
		</>
	);
};
export const DocumentManager = () => {
	return (
		<Form className="bg-gray-100 p-4">
			<Form.Field>
				<Button
					floated="right"
					color="teal"
					icon="add"
					content="Create New"
					href="/documents/new"
				/>
				<HeaderIconSub
					content="Document Manager"
					icon="sticky note outline"
					sub="For all your Document Needs"
				/>
			</Form.Field>

			<Form.Field></Form.Field>
			<Form.Field>
				<Documents />
			</Form.Field>
		</Form>
	);
};
