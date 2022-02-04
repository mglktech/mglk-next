import { Form, Checkbox, Button, Label, Icon, List } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const BotPanel = ({ bot, useRefreshToken }) => {
	const router = useRouter();
	const pushAuth = () => router.push('/api/bot/authenticate');
	console.log(bot);
	return (
		<>
			{bot?.success ? ( // Has the bot data been fetched?
				<>
					<Form.Field>
						<Label compact disabled color="green" icon labelPosition="right">
							<Icon name="refresh" />
							Token Obtained
						</Label>
					</Form.Field>
				</>
			) : (
				<>
					<Form.Field>
						<Button
							color="red"
							compact
							icon
							labelPosition="right"
							onClick={pushAuth}
						>
							<Icon name="refresh" />
							Obtain Bot Token
						</Button>
					</Form.Field>
				</>
			)}
		</>
	);
};

export default BotPanel;
