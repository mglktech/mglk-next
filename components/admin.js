import { Form, Checkbox, Button, Label } from 'semantic-ui-react';
import { useRouter } from 'next/router';
// https://discord.com/api/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent
// HvzPi0oGvvqMQjBCGo5J4duhfq016I

export const GuildComponent = ({ botProps }) => {
	const router = useRouter();
	console.log(botProps);
	return (
		<>
			<Form className="bg-gray-100 p-4">
				<Form.Field>
					<label>Discord Bot Testing Component</label>
				</Form.Field>
				<Form.Field>
					<Button
						// disabled={botProps.bot ? true : false}
						onClick={(e) => {
							console.log(e);
							router.push(
								`https://discord.com/api/oauth2/authorize?response_type=code&client_id=${botProps.client_id}&scope=bot&guild_id=${botProps.guild_id}&redirect_uri=${botProps.redir_uri}&prompt=consent`
							);
						}}
					>
						Authorize Bot
					</Button>

					{botProps.bot ? (
						<Label color="green">Bot is Connected</Label>
					) : (
						<Label color="red">Bot is Not Connected</Label>
					)}
				</Form.Field>
			</Form>
		</>
	);
};

export const RouteTesting = () => {
	const router = useRouter();
	return (
		<>
			<Form className="bg-gray-100 p-4">
				<Form.Field>
					<label>Route Testing Component</label>
				</Form.Field>
				<Button onClick={() => router.push('/admin/testing/ClientAuth')}>
					Client-side Authentication
				</Button>
				<Button onClick={() => router.push('/admin/testing/ServerAuth')}>
					Server-side Authentication
				</Button>
			</Form>
		</>
	);
};
