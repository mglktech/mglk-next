import {
	Button,
	Header,
	Image,
	Modal,
	Form,
	Icon,
	Input,
	List,
	Select,
} from 'semantic-ui-react';
import { HeaderIconSub } from '../base';
import { useState, useEffect } from 'react';
/*
MODULES
mglk.tech/software/(module_name)
Accessible to specific roles within specific guilds,
Special check needed on the route to ensure only accounts with proper permission have access to the module itself.


*/

const CreateModule = ({ bot, guildOptions }) => {
	return (
		<List>
			<List.Item>
				<Input
					// value={form.guild_id}
					name="name"
					label="Name"
					placeholder="A Friendly Name"
					// onChange={handleChange}
				/>
			</List.Item>
			<List.Item>
				<Input
					name="route"
					label="Route Name"
					placeholder="lowercase_semantic"
				/>
			</List.Item>
			<List.Item>
				Associated Guild
				<Select placeholder="Select your Guild" options={guildOptions} />
			</List.Item>

			<List.Item>
				Associated Roles
				<Select
					placeholder="Select your Role"
					options={bot?.guild?.roles.map((role) => {
						console.log(role);
						return {
							key: role.id,
							value: role.name,
							text: role.name,
						};
					})}
				/>
			</List.Item>
			<List.Item></List.Item>
		</List>
	);
};

const ModuleEditor = () => {
	const [bot, setBot] = useState();
	const fetchBotData = async () => {
		try {
			const res = await fetch('/api/bot/get').then((data) => data.json());
			//console.log(res.data);
			setBot(res.data);
		} catch {
			setBot({ err: true });
		}
		//console.log(botData);
	};

	useEffect(() => {
		fetchBotData();
	}, []);
	const [open, setOpen] = useState(false);
	const guildOptions = [
		{
			key: 'first',
			value: 'first',
			text: 'First Guild',
		},
		{
			key: 'second',
			value: 'second',
			text: 'Second Guild',
		},
	];
	return (
		<>
			<Form className="bg-gray-100 p-4">
				<HeaderIconSub
					content="Module Editor"
					sub="The default route for Modules is /software/(Module_Name)"
					icon="settings"
				/>
				<Form.Field className="pt-5">
					<Modal
						onClose={() => setOpen(false)}
						onOpen={() => setOpen(true)}
						open={open}
						trigger={<Button icon="add" content="Create" />}
					>
						<Modal.Header>Creating New Module</Modal.Header>
						<Modal.Content>
							<Modal.Description>
								List of components needed to complete this modal:
							</Modal.Description>
							{/*  */}
							<CreateModule />
						</Modal.Content>
						<Modal.Actions>
							<Button color="black" onClick={() => setOpen(false)}>
								Nope
							</Button>
							<Button
								content="Yep, that's me"
								labelPosition="right"
								icon="checkmark"
								onClick={() => setOpen(false)}
								positive
							/>
						</Modal.Actions>
					</Modal>
				</Form.Field>
			</Form>
		</>
	);
};

export default ModuleEditor;
