import { Form, Checkbox, Button, Label, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
export const DiscordBot = () => {
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
