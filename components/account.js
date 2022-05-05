import { useState, useEffect } from 'react';

import {
	Header,
	Textbox,
	Button,
	Card,
	Container,
	Image,
	Icon,
	Grid,
	Rail,
	Segment,
	List,
	Label,
	Input,
	Form,
	Placeholder,
	Table,
	Dropdown,
	Select,
	Modal,
	Divider,
} from 'semantic-ui-react';

import { HeaderIconSub, InputInitiallyHidden } from './base';

const displayNameOptions = [
	{
		key: 1,
		text: 'First Name Only',
		value: 'FNO',
		//image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
	},
	{
		key: 2,
		text: 'Last Name Only',
		value: 'LNO',
	},
	{
		key: 3,
		text: 'First Name and Last Name',
		value: 'FNLN',
	},
];

export const AccountCard = ({ user }) => {
	return (
		<Card>
			<Image square size="small" src={user?.profile?.avatar} />
			<Card.Content>
				<Card.Header>
					<Placeholder>
						<Placeholder.Header>Display Name</Placeholder.Header>
					</Placeholder>
				</Card.Header>
				<Card.Meta>
					<Placeholder>Roles</Placeholder>
				</Card.Meta>
				<Card.Description>
					<Placeholder>
						<Placeholder.Paragraph>Short Biography</Placeholder.Paragraph>
					</Placeholder>
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

// const ModalEditFullNameButton = ({ handleChange }) => {
// 	const [open, setOpen] = useState(false);
// 	const [firstName, setFirstName] = useState('');
// 	const [lastName, setLastName] = useState('');
// 	const submit = (e) => {
// 		e.preventDefault();
// 		setOpen(false);
// 		handleChange({
// 			firstName,
// 			lastName,
// 		});
// 	};
// 	return (
// 		<>
// 			<Modal
// 				open={open}
// 				onClose={() => setOpen(false)}
// 				onOpen={() => setOpen(true)}
// 				size="tiny"
// 				trigger={<Button basic icon="wrench" />}
// 			>
// 				<Modal.Header>Edit Name</Modal.Header>
// 				<Modal.Content>
// 					<Modal.Description>
// 						<Form>
// 							<Form.Group>
// 								<Form.Input
// 									label="First Name"
// 									placeholder="First Name"
// 									onChange={(e) => setFirstName(e.target.value)}
// 								/>
// 								<Form.Input
// 									label="Last Name"
// 									placeholder="Last Name"
// 									onChange={(e) => setLastName(e.target.value)}
// 								/>
// 							</Form.Group>
// 						</Form>
// 					</Modal.Description>
// 				</Modal.Content>
// 				<Modal.Actions>
// 					<Button onClick={() => setOpen(false)} basic color="red">
// 						Cancel
// 					</Button>
// 					<Button onClick={submit} color="green">
// 						Save
// 					</Button>
// 				</Modal.Actions>
// 			</Modal>
// 		</>
// 	);
// };

const ModalEditDisplayPictureButton = ({ user, handleChange }) => {
	const [open, setOpen] = useState(false);
	const [avatar, setAvatar] = useState(user?.profile?.avatar);
	const submit = (e) => {
		e.preventDefault();
		setOpen(false);
		handleChange({
			profile: {
				avatar,
			},
		});
	};
	return (
		<Modal
			size="tiny"
			classname="flex flex-col justify-center "
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={<Button>Show Modal</Button>}
		>
			<Modal.Header>Select a Photo</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<Image
						centered
						alt="avatar"
						icon={'user'}
						size="medium"
						src={
							avatar ||
							user?.profile?.avatar ||
							'/bin/blank-profile-picture.webp'
						}
						wrapped
						rounded
					/>
					<Divider />
					<Input
						fluid
						placeholder={user?.profile?.avatar || 'Enter URL'}
						onChange={(e) => {
							setAvatar(e.target.value);
						}}
					/>
				</Modal.Description>
			</Modal.Content>

			<Modal.Actions>
				<Button color="black" onClick={() => setOpen(false)}>
					Nope
				</Button>
				<Button
					content="Yep, that's me"
					labelPosition="right"
					icon="checkmark"
					onClick={submit}
					positive
				/>
			</Modal.Actions>
		</Modal>
	);
};

// const ModalEditDisplayNameButton = ({ handleChange }) => {
// 	const [open, setOpen] = useState(false);
// 	const [value, setValue] = useState('');
// 	const submit = (e) => {
// 		e.preventDefault();
// 		setOpen(false);
// 		handleChange({
// 			profile: {
// 				displayName: value,
// 			},
// 		});
// 		console.log('submit', value);
// 	};
// 	return (
// 		<>
// 			<Modal
// 				open={open}
// 				onClose={() => setOpen(false)}
// 				onOpen={() => setOpen(true)}
// 				size="mini"
// 				trigger={<Button basic icon="wrench" />}
// 			>
// 				<Modal.Header>Edit Display Name</Modal.Header>
// 				<Modal.Content>
// 					<Modal.Description>
// 						<Form>
// 							<Form.Input
// 								name="displayName"
// 								fluid
// 								label="Display Name"
// 								placeholder={value}
// 								onChange={(e) => setValue(e.target.value)}
// 							/>
// 						</Form>
// 					</Modal.Description>
// 				</Modal.Content>
// 				<Modal.Actions>
// 					<Button onClick={() => setOpen(false)} basic color="red">
// 						Cancel
// 					</Button>
// 					<Button type="submit" onClick={submit} color="green">
// 						Save
// 					</Button>
// 				</Modal.Actions>
// 			</Modal>
// 		</>
// 	);
// };

const ModifyDisplayName = ({ user, handleChange }) => {
	const [editing, setEditing] = useState(false);
	const [displayName, setDisplayName] = useState(user?.profile?.displayName);
	const submit = (e) => {
		e.preventDefault();
		setEditing(false);
		handleChange({
			profile: {
				displayName,
			},
		});
	};
	switch (editing) {
		case true:
			return (
				<>
					<Input
						placeholder={user?.profile?.displayName}
						onChange={(e) => setDisplayName(e.target.value)}
					/>
					<Button content="save" onClick={submit} />
				</>
			);
		case false:
			return (
				<>
					<span>{user?.profile?.displayName}</span>
					<Button onClick={() => setEditing(true)} basic icon="wrench" />
				</>
			);
	}
};

const ModifyFullName = ({ user, handleChange }) => {
	const [editing, setEditing] = useState(false);
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const submit = (e) => {
		e.preventDefault();
		setEditing(false);
		handleChange({
			firstName,
			lastName,
		});
	};
	switch (editing) {
		case true:
			return (
				<>
					<div>
						<Input
							placeholder={user?.firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<Input
							placeholder={user?.lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<Button content="save" onClick={submit} />
				</>
			);
		case false:
			return (
				<>
					<span>
						{user?.firstName} {user?.lastName}
					</span>
					<Button onClick={() => setEditing(true)} basic icon="wrench" />
				</>
			);
	}
};

export const UserInformation = ({ user, handleChange }) => {
	return (
		<>
			<Segment vertical>
				<Label attached="top">{user.userType}</Label>
				<Table celled>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<b>User ID:</b>
							</Table.Cell>
							<Table.Cell>
								<b className="px-2 bg-gray-500 text-white tracking-wider">
									{user?.uuid}
								</b>
							</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell>
								<b>Email:</b>
							</Table.Cell>
							<Table.Cell>
								<span>{user?.email}</span>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<b>Full Name:</b>
							</Table.Cell>
							<Table.Cell className="flex justify-between items-center">
								<ModifyFullName user={user} handleChange={handleChange} />
							</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell>
								<b>Display Name:</b>
							</Table.Cell>
							<Table.Cell className="flex justify-between items-center">
								<ModifyDisplayName user={user} handleChange={handleChange} />
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								<b>Avatar:</b>
							</Table.Cell>
							<Table.Cell>
								<ModalEditDisplayPictureButton
									user={user}
									handleChange={handleChange}
									trigger={<Button size="small">Change Avatar</Button>}
								/>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Segment>
		</>
	);
};
