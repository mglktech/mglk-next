import NextAuth from 'next-auth';
//import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
//import Account from '../../../models/Account';
//import Article from '../../../models/Article';
//import { ObjectId } from 'mongodb';
import { findGuilds } from '../../../utils/discord';
import { ServerSession } from 'mongoose/node_modules/mongodb';

const doRoles = (user) => {
	const roles = [];
	const isOwner = user.discord_id === process.env.DISCORD_SITE_OWNER_ID;
	if (isOwner) {
		roles.push('Owner');
	}
	return roles;
};

const NewDiscordProvider = (options) => {
	return {
		id: 'discord',
		name: 'Discord',
		type: 'oauth',
		authorization: 'https://discord.com/api/oauth2/authorize',
		token: 'https://discord.com/api/oauth2/token',
		userinfo: 'https://discord.com/api/users/@me',
		guilds: 'https://discord.com/api/users/@me/guilds',
		async profile(profile, tokens) {
			// console.log(`PROFILE: `);
			// console.log(profile);
			// console.log(`TOKENS`);
			//console.log(tokens);
			//console.log(tokens.access_token);

			//profile.guilds = await findGuilds(profile.id, tokens);
			// const isOwner = profile.id === process.env.DISCORD_SITE_OWNER_ID;
			// if (isOwner) {
			// 	profile.isOwner = true;
			// }
			//const guilds = await findGuilds(tokens);
			// if (profile.guilds) { // For filtering owner role to guild owner, useful later.
			// 	const ownerGuild = await profile.guilds.find(
			// 		(guild) => guild.id === process.env.DISCORD_SERVER_ID
			// 	);
			// 	if (ownerGuild) {
			// 		if (ownerGuild.owner === true) {
			// 			profile.owner = true;
			// 		}
			// 	}
			// }
			profile.discord_id = profile.id;
			if (profile.avatar === null) {
				const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
				profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
			} else {
				const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
				profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
			}
			return profile;
		},
		options,
	};
};

export default NextAuth({
	// Configure one or more authentication providers
	secret: 'this-is-not-a-very-secure-secret',
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: 'database',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 86400000, // 24 hours

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 0, // Always keep the database updated.
	},
	providers: [
		// DiscordProvider({
		// 	clientId: process.env.DISCORD_CLIENT_ID,
		// 	clientSecret: process.env.DISCORD_CLIENT_SECRET,
		// 	authorization: { params: { scope: 'identify guilds' } },
		// }),
		NewDiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization: {
				params: { scope: 'identify guilds' },
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log(`User Signed in - ${user.username}`);
			// Scrub their guilds
			// Scrub guild roles?
			return true;
		},
		async session({ session, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.user = user;
			session.roles = doRoles(user);
			// console.log(session);
			// session.user.guilds = await findGuilds(user.id);
			// if (session.user.guilds) {
			// 	//console.log(session.user.guilds);
			// 	const serverGuild = session.user.guilds.find(
			// 		(guild) => guild.id === process.env.DISCORD_SERVER_ID
			// 	);
			// 	if (serverGuild.owner) {
			// 		session.user.serverOwner = true;
			// 	} else {
			// 		session.user.serverOwner = false;
			// 	}
			// }

			return Promise.resolve(session);
		},
	},

	adapter: MongoDBAdapter(clientPromise),
	database: process.env.MONGODB_URI,
	// debug: true,
});
