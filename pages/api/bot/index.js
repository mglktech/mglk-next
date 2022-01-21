//import '../../../utils/dbConnect';
//import { bot_findGuilds } from '../../../utils/discord';
import URLSearchParams from 'url-search-params';
import Bots from '../../../models/Bot';
import Guilds from '../../../models/Guilds';

const Index = async (req, res) => {
	const data = {
		client_id: process.env.DISCORD_CLIENT_ID,
		client_secret: process.env.DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		code: req.query.code || null,
		redirect_uri: 'http://localhost:3000/api/bot',
	};
	const searchParams = new URLSearchParams();
	for (const prop in data) {
		searchParams.set(prop, data[prop]);
	}
	let fetch_res = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: searchParams,
	}).then((data) => data.json());
	if (!fetch_res.guild) {
		console.log(fetch_res);
		res.redirect('/admin');
		return;
	}
	console.log(fetch_res.guild);
	fetch_res.client_id = data.client_id;
	res.redirect('/admin');

	Bots.findOneAndUpdate({ client_id: fetch_res.client_id }, fetch_res, {
		upsert: true,
	}).exec();
};
export default Index;
