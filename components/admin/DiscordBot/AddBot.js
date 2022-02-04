import React from 'react';
import { Button, Icon, Modal, Header, Input, Form } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
const AddBot = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ client_id: null, guild_id: null });
	const redir_uri = 'http://localhost:3000/api/bot';
	const pushAuth = () =>
		router.push(
			`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${form.client_id}&scope=bot&guild_id=${form.guild_id}&redirect_uri=${redir_uri}&prompt=consent`
		);
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<>
			<Modal
				size="tiny"
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				open={open}
				trigger={<Button icon="add" content="Create" />}
			>
				<Modal.Header>Add New Bot</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Header as="h5">Please fill the details below</Header>
						<Form>
							<Form.Field>
								<Input
									value={form.client_id}
									name="client_id"
									label="Client ID:"
									onChange={handleChange}
								></Input>
							</Form.Field>
							<Form.Field>
								<Input
									value={form.guild_id}
									name="guild_id"
									label="Guild ID:"
									onChange={handleChange}
								></Input>
							</Form.Field>
						</Form>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button color="black" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					{form.client_id && form.guild_id ? (
						<>
							<Button
								content="Authenticate"
								labelPosition="right"
								icon="arrow right"
								onClick={() => pushAuth()}
								positive
							/>
						</>
					) : (
						<>
							<Button
								disabled
								content="Authenticate"
								labelPosition="right"
								icon="arrow right"
								positive
							/>
						</>
					)}
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default AddBot;
