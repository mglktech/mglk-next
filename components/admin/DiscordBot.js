import { Form, Checkbox, Button, Label, Icon } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import BotPanel from './DiscordBot/BotPanel';
export const DiscordBot = () => {
	const [bot, setBot] = useState();
	const fetchBotData = async () => {
		try {
			const data = await fetch('/api/bot/get').then((data) => data.json());
			setBot(data);
		} catch {
			setBot({ err: true });
		}
		//console.log(botData);
	};
	useEffect(() => {
		fetchBotData();
	}, []);

	const useRefreshToken = async () => {
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
					{bot ? (
						<>
							{bot.err ? (
								<>
									<Label>There was an error fetching Discord bot.</Label>
								</>
							) : (
								<>
									<BotPanel bot={bot} useRefreshToken={useRefreshToken} />
								</>
							)}
						</>
					) : (
						<>
							<Form loading></Form>
						</>
					)}
				</Form.Field>
			</Form>
		</>
	);
};
