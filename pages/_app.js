//import '../styles/globals.css'
import '/styles/github-markdown.css';
import 'semantic-ui-css/semantic.min.css';
import { SessionProvider, useSession, getSession } from 'next-auth/react';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			{Component.auth ? (
				<Auth>
					{Component.admin ? (
						<Admin>
							<Component {...pageProps} />
						</Admin>
					) : (
						<Component {...pageProps} />
					)}
				</Auth>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}
function Auth({ children }) {
	const { data: session, status } = useSession({ required: true });
	const isUser = !!session?.user;
	if (isUser) {
		return children;
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div>Loading...</div>;
}
function Admin({ children }) {
	const { data: session, status } = useSession({ required: true });
	const isAdmin = !!session?.user?.owner;
	if (isAdmin) {
		return children;
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div>Loading...</div>;
}

// async function Admin({ children }) {
// 	const session = getSession();
// 	const AdminGuild = await guildModel.find({
// 		guild_id: process.env.DISCORD_SERVER_ID,
// 	});
// 	const AdminId = AdminGuild.owner;
// 	const isAdmin = !!session?.user?.id === AdminId;
// 	if (isAdmin) {
// 		return children;
// 	}

// 	// Session is being fetched, or no user.
// 	// If no user, useEffect() will redirect.
// 	return <div>Loading...</div>;
// }

export default MyApp;
