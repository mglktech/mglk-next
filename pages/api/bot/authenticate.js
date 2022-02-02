import { getSession } from 'next-auth/react';
const Authenticate = async (req, res) => {
	const session = await getSession({ req });
	const client_id = process.env.DISCORD_CLIENT_ID;
	const guild_id = process.env.DISCORD_SERVER_ID;
	const redir_uri = 'http://localhost:3000/api/bot';
	const link = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${client_id}&scope=bot&guild_id=${guild_id}&redirect_uri=${redir_uri}&prompt=consent`;

	if (session.user.owner) {
		res.redirect(link);
		return;
	}
	res.status(404).send('You are not allowed to view this page.');
	return;
};
export default Authenticate;
