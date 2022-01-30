const API_ENDPOINT = 'https://discord.com/api';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
import { toParams, RefreshToken } from '../../../utils/discord';

const Index = async (req, res) => {
	//console.log(`/api/bot/token:`);
	const body = JSON.parse(req.body);
	//console.log(body);
	// const headers = {
	// 	'Content-Type': 'application/x-www-form-urlencoded',
	// };
	// const data = {
	// 	client_id: CLIENT_ID,
	// 	client_secret: CLIENT_SECRET,
	// 	grant_type: body.grant_type,
	// 	refresh_token: body.refresh_token,
	// };
	// console.log(toParams(data));
	// const result = await fetch(`${API_ENDPOINT}/oauth2/token`, {
	// 	method: 'POST',
	// 	headers,
	// 	body: toParams(data),
	// }).then((data) => data.json());
	// console.log(result);
	const response = await RefreshToken(body.refresh_token);
	res.status(200).json(response);
};
export default Index;
