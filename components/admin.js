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
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
// https://discord.com/api/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent
// HvzPi0oGvvqMQjBCGo5J4duhfq016I

import { FormHeader } from './forms/FormComponents';
import { ProjectEditor } from './admin/projects';
import { DocumentManager } from './admin/documents';
import NodeModules from './admin/NodeModules';
const AdminMenu = ({ activeItem, handleItemClick }) => {
	return (
		<Menu>
			<Menu.Item
				name="documents"
				active={activeItem === 'documents'}
				onClick={handleItemClick}
			>
				Documents
			</Menu.Item>
			<Menu.Item
				name="gallery"
				active={activeItem === 'gallery'}
				onClick={handleItemClick}
			>
				Gallery
			</Menu.Item>
			<Menu.Item
				name="telemetry"
				active={activeItem === 'telemetry'}
				onClick={handleItemClick}
			>
				Site Telemetry
			</Menu.Item>
			<Menu.Item
				name="usermgmt"
				active={activeItem === 'usermgmt'}
				onClick={handleItemClick}
			>
				User Management
			</Menu.Item>

			<Menu.Item
				name="nodemodules"
				active={activeItem === 'nodemodules'}
				onClick={handleItemClick}
			>
				Node Modules
			</Menu.Item>
		</Menu>
	);
};
const AdminComponentFrame = ({ activeItem }) => {
	switch (activeItem) {
		case 'documents':
			return <DocumentManager />;
		case 'nodemodules':
			return <NodeModules />;
	}
	return <></>; // to ensure something is returned if case is not hit
};
export const AdminComponent = ({ ctx }) => {
	const [activeItem, setActiveItem] = useState(ctx);
	const handleItemClick = (e, { name }) => {
		//console.log(e);
		setActiveItem(name);
	};
	return (
		<Container>
			<Segment>
				<FormHeader
					content="Administrator Panel"
					sub={
						<AdminMenu
							activeItem={activeItem}
							handleItemClick={handleItemClick}
						/>
					}
					icon="shield alternate"
				/>

				<AdminComponentFrame activeItem={activeItem} />
			</Segment>
		</Container>
	);
};

export const DemoComponent = () => {
	const [bot, setBot] = useState();
	const fetchBotData = async () => {
		const data = await fetch('/api/bot/get').then((data) => data.json());
		//console.log(botData);
		setBot(data);
	};
	useEffect(() => {
		fetchBotData();
	}, []);

	const expiry_date = () => {
		let d = new Date(bot?.data.updatedAt);
		d = new Date(d.getTime() + bot?.data.expires_in);
		//console.log(resultDate);
		return d;
	};
	const inDate = () => {
		const td = new Date().getTime();
		if (td < expiry_date()) {
			return true;
		}
		return false;
	};
	const useRefreshToken = async () => {
		// fetch https://discord.com/api/oauth2/token
		// client_id, client_secret, grant_type(refresh), refresh_token
		//console.log(botProps);

		const data = {
			grant_type: 'refresh_token',
			refresh_token: bot.data.refresh_token,
		};
		const res = await fetch('/api/bot/token', {
			method: 'POST',
			body: JSON.stringify(data),
		}).then((res) => res.json());
		//const json = await res.json();
		console.log(res);
		fetchBotData();
	};

	return (
		<>
			<Form className="bg-gray-100 p-4">
				<Form.Field>
					<label>Discord Bot</label>
				</Form.Field>
				<Form.Field>
					{/* {console.log(botData)} */}
					{bot?.success ? ( // Has the bot data been fetched?
						<>
							<Button disabled color="green" compact icon labelPosition="right">
								<Icon name="refresh" />
								Bot Token Obtained
							</Button>
						</>
					) : (
						<>
							<Button
								color="red"
								compact
								icon
								labelPosition="right"
								onClick={fetchBotData}
							>
								<Icon name="refresh" />
								Obtain Bot Token
							</Button>
						</>
					)}
				</Form.Field>
				<Form.Field>
					<label>Token Properties</label>
					<Button compact icon="refresh" onClick={useRefreshToken}></Button>
					<Label>
						Updated{' '}
						<Moment
							date={bot?.data.updatedAt}
							interval={10000}
							fromNow
							// format="hh:mm:ss"
						/>
					</Label>
					{inDate() ? (
						<>
							<Label color="green">
								Expires{' '}
								<Moment
									date={expiry_date()}
									interval={10000}
									fromNow
									// format="hh:mm:ss"
								/>
							</Label>
						</>
					) : (
						<>
							<Label color="red">Token Expired</Label>
						</>
					)}
					<Label color="orange">
						<Icon name="time" />
						{Math.floor(bot?.data.expires_in / 1000)} s
					</Label>
				</Form.Field>
			</Form>
		</>
	);
};

export const GuildComponent = ({ botProps }) => {
	const [botCon, setBotCon] = useState(null);

	const bot = JSON.parse(botProps.bot);
	const expiry_date = () => {
		let d = new Date(bot.updatedAt);
		d = new Date(d.getTime() + bot.expires_in);
		//console.log(resultDate);
		return d;
	};
	const inDate = () => {
		const td = new Date().getTime();
		if (td < expiry_date()) {
			return true;
		}
		return false;
	};
	//bot.expiry_date = expiry_date();
	const today = new Date();
	const timeUntilDead = expiry_date() - today;
	//console.log(timeUntilDead);
	//console.log(inDate());
	const useRefreshToken = async () => {
		// fetch https://discord.com/api/oauth2/token
		// client_id, client_secret, grant_type(refresh), refresh_token
		//console.log(botProps);

		const data = {
			grant_type: 'refresh_token',
			refresh_token: bot.refresh_token,
		};
		const res = await fetch('/api/bot/token', {
			method: 'POST',
			body: JSON.stringify(data),
		}).then((res) => res.json());
		//const json = await res.json();
		//console.log(res);
	};
	const checkBotConnection = () => {
		setBotCon('Refresh Clicked');
	};
	//console.log(botProps);
	return (
		<>
			<Form className="bg-gray-100 p-4">
				<Form.Field>
					<label>Discord Bot Testing</label>
				</Form.Field>
				<Form.Field>
					<Button
						//disabled={botProps.bot ? true : false}
						compact
						onClick={(e) => {
							//console.log(e);
							router.push(
								`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${botProps.client_id}&scope=bot&guild_id=${botProps.guild_id}&redirect_uri=${botProps.redir_uri}&prompt=consent`
							);
						}}
					>
						Authorize Bot
					</Button>

					{botProps.bot ? (
						<Label color="green">Bot Token Obtained</Label>
					) : (
						<Label color="red">Please Authenticate</Label>
					)}
				</Form.Field>
				<Form.Field>
					<label>Token Properties</label>
					<Button icon="refresh" onClick={useRefreshToken}></Button>
					<Label>
						Updated{' '}
						<Moment
							date={bot.updatedAt}
							interval={10000}
							fromNow
							// format="hh:mm:ss"
						/>
					</Label>
					{inDate() ? (
						<>
							<Label color="green">
								Expires{' '}
								<Moment
									date={expiry_date()}
									interval={10000}
									fromNow
									// format="hh:mm:ss"
								/>
							</Label>
						</>
					) : (
						<>
							<Label color="red">Token Expired</Label>
						</>
					)}
					<Label color="orange">
						<Icon name="time" />
						{Math.floor(bot.expires_in / 1000)} s
					</Label>
				</Form.Field>
			</Form>
		</>
	);
};

export const RouteTesting = () => {
	return (
		<>
			<Form className="bg-gray-100 p-4">
				<Form.Field>
					<label>Route Testing</label>
				</Form.Field>

				<Button compact as="a" href="/admin/testing/ClientAuth" target="_blank">
					Client-side Authentication
				</Button>
				{/* <Button onClick={() => doClientsideAuth(session)}>
					Client-side Authentication
				</Button> */}
				<Button compact as="a" href="/admin/testing/ServerAuth" target="_blank">
					Server-side Authentication
				</Button>
			</Form>
		</>
	);
};
