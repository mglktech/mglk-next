import guildModel from '../../models/Guilds';
import dbConnect from '../dbConnect';
dbConnect();

// Find guilds from given token
// Upsert guilds to the database
// Return array of just guild IDs
const doFetch = async (tokens) => {
	const res = await fetch(`https://discord.com/api/users/@me/guilds`, {
		headers: {
			Authorization: `Bearer ${tokens.access_token}`,
		},
	});
	return await res.json();
};
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
const findGuilds = async (userId, tokens) => {
	console.log(tokens);
	const guilds = await doFetch(tokens);
	if (guilds.code === 0) {
		console.log(`GUILD FETCH ERROR ${guilds.message}`);
		return null;
	}
	upsertToDatabase(userId, guilds);
	return guilds;
};
export default findGuilds;
