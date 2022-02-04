import React from 'react';
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
import { useState, useEffect } from 'react';
const CreateModule = () => {
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
		</>
	);
};

export default CreateModule;
