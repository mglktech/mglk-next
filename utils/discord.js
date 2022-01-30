import dbConnect from '../lib/dbConnect';
import guildModel from '../models/Guilds';
import Bots from '../models/Bot';
import URLSearchParams from 'url-search-params';
const API_ENDPOINT = 'https://discord.com/api';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

export const toParams = (data) => {
	const searchParams = new URLSearchParams();
	for (const prop in data) {
		searchParams.set(prop, data[prop]);
	}
	return searchParams;
};

export const RefreshToken = async (refresh_token) => {
	await dbConnect();
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
	};
	const data = {
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'refresh_token',
		refresh_token: refresh_token,
	};
	const res = await fetch(`${API_ENDPOINT}/oauth2/token`, {
		method: 'POST',
		headers,
		body: toParams(data),
	});
	const json = await res.json();
	if (res.status === 400) {
		console.log('utils/Discord.js Error:');
		console.log(json);
		return { success: false, error: json.error };
	}
	Bots.findOneAndUpdate(
		{ client_id: CLIENT_ID },
		{
			access_token: json.access_token,
			refresh_token: json.refresh_token,
			expires_in: json.expires_in,
		}
	).exec();
	console.log('utils/discord.js Success:');
	console.log(json);
	return { success: true, expires_in: json.expires_in };
};

const doFetch = async (access_token) => {
	const res = await fetch(`https://discord.com/api/users/@me/guilds`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	return await res.json();
};

const _appFetch = async (access_token) => {
	const res = await fetch(`https://discord.com/api/oauth2/@me`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	}).then((data) => data.json());
	if (res.code === 0) {
		console.log(`APP FETCH ERROR ${res.message}`);
		return false;
	}
	return res;
};
// const _guildFetch = async (access_token) => {
// 	const guildID = process.env.DISCORD_SERVER_ID;
// 	const res = await fetch(`https://discord.com/api/oauth2/applications/@me`, {
// 		headers: {
// 			Authorization: `Bearer ${access_token}`,
// 		},
// 	}).then((data) => data.json());
// 	if (res.code === 0) {
// 		console.log(`APP guildFETCH ERROR ${res.message}`);
// 		return false;
// 	}
// 	return res;
// };

// export const botFetch = async () => {
// 	const botToken = process.env.DISCORD_BOT_TOKEN;
// 	const res = await fetch(`https://discord.com/api/users/@me`, {
// 		headers: {
// 			Authorization: `Bot ${botToken}`,
// 		},
// 	}).then((data) => data.json());
// 	if (res.code === 0) {
// 		console.log(`BOT FETCH ERROR ${res.message}`);
// 		return false;
// 	}
// 	return res;
// };

const upsertToDatabase = (userId, guilds) => {
	//console.log(userId);
	guilds.forEach((guild) => {
		guildModel
			.findOneAndUpdate(
				{ guild_id: guild.id },
				{
					guild_id: guild.id,
					owner: guild.owner ? userId : '',
					name: guild.name,
					icon: guild.icon,
					features: guild.features,
				},
				{ upsert: true }
			)
			.exec();
		//return guild.id;
	});
};
export const findGuilds = async (userId, tokens) => {
	//console.log(tokens);
	await dbConnect();
	const guilds = await doFetch(tokens.access_token);
	if (guilds.code === 0) {
		console.log(`GUILD FETCH ERROR ${guilds.message}`);
		return null;
	}
	upsertToDatabase(userId, guilds);
	return guilds;
};
export const bot_findMe = async () => {
	const bot_token = await findBotToken();
	if (bot_token) {
		return _appFetch(bot_token.access_token);
	}
	return false;
};
export const bot_findGuilds = () => {};

const findBotToken = () => {
	const client_id = process.env.DISCORD_CLIENT_ID;
	return Bots.findOne({ client_id }) || false;
};
