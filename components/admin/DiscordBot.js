import { Form, Checkbox, Button, Label, Icon, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import BotPanel from './DiscordBot/BotPanel';
import TokenProperties from './DiscordBot/TokenProperties';
import { HeaderIconSub } from '../base';
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
					{bot ? (
						<>
							{bot.err ? (
								<>
									<HeaderIconSub
										content="Discord Bot"
										icon="file alternate outline"
										sub={
											<Label>There was an error fetching Discord bot.</Label>
										}
									/>
								</>
							) : (
								<>
									<HeaderIconSub
										content="Discord Bot"
										icon="file alternate outline"
										sub={
											<BotPanel bot={bot} useRefreshToken={useRefreshToken} />
										}
									/>

									{/* Token Obtainy Bit above, token refreshy bit below. */}
									<TokenProperties
										bot={bot}
										useRefreshToken={useRefreshToken}
									/>
								</>
							)}
						</>
					) : (
						<>
							<Form loading>
								<Loader size="massive">Loading</Loader>
							</Form>
						</>
					)}
				</Form.Field>
				<Form.Field></Form.Field>
			</Form>
		</>
	);
};
