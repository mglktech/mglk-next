import Discord from 'discord.js';

const connect = {};
async function discordConnect() {
	if (connect.isConnected) {
		return connect;
	}
	const discordClient = new Discord.Client();
	await discordClient.login(token);
	connect.client = discordClient;
	connect.isConnected = true;
	return connect;
}
const token = process.env.DISCORD_BOT_TOKEN;
//const logger = require('emberdyn-logger');

// client.fetchGuild = async (guildID) => {
// 	try {
// 		const guild = await client.guilds.fetch(guildID);
// 		return guild;
// 	} catch (err) {
// 		return HandleErrors(err);
// 	}
// };

// client.fetchMember = async (guildID, playerID) => {
// 	const guild = await client.guilds.fetch(guildID);
// 	const now = Date.now();
// 	return await guild.members
// 		.fetch(playerID)
// 		.then((member) => {
// 			return {
// 				user: {
// 					id: member.user.id,
// 					username: member.user.username,
// 					discriminator: member.user.discriminator,
// 					avatar: member.user.avatar,
// 				},
// 				nickname: member.nickname,
// 				roles: member._roles,
// 				deleted: member.deleted,
// 				joined: member.joinedTimestamp,
// 				_dateUpdated: now,
// 			};
// 		})
// 		.catch((err) => {
// 			if (err != 'DiscordAPIError: Unknown Member') {
// 				HandleErrors(err);
// 			}
// 		});
// };

// client.fetchRole = async (guildID, role_id) => {
// 	const guild = await client.guilds.fetch(guildID);
// 	//console.log(guild);
// 	//console.log(`Finding role with id: ${role_id}`);
// 	return await guild.roles
// 		.fetch(role_id, false, true)
// 		.then((role) => {
// 			return {
// 				//id: role.id,
// 				name: role.name,
// 				color: role.color,
// 				hoist: role.hoist,
// 				rawPosition: role.rawPosition,
// 				managed: role.managed,
// 				mentionable: role.mentionable,
// 				deleted: role.deleted,
// 			};
// 		})
// 		.catch((err) => HandleErrors(err));
// };

// client.fetchRoles = async (guild_id) => {
// 	const guild = await client.guilds.fetch(guild_id);
// 	return guild.roles.fetch('', false, true).then((roleManager) => {
// 		let c = 10;
// 		let roles = [];
// 		roleManager.cache.forEach((role) => {
// 			if (c > 0) {
// 				c--;
// 				roles.push(role);
// 			}
// 		});
// 		return roles;
// 		//console.log("Roles:");
// 		//console.log(roles);
// 	});
// };

// const HandleErrors = (err, src = 'utils/discordClient.js') => {
// 	console.log(`[${src}]: ${err}`);
// };
export default discordConnect;
