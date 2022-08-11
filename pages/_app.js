//import '../styles/globals.css'
import '/styles/globals.css';
//import '/styles/github-markdown.css';
import 'semantic-ui-css/semantic.min.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { SessionProvider, useSession, getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { isAuth, isAdmin } from '../lib/auth';

function _App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			{Component.requireRole ? (
				<RequireRole role={Component.requireRole}>
					<Component {...pageProps} />
				</RequireRole>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}

function App({ Component, pageProps: { session, ...pageProps } }) {
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

// Serverside hooks for checking authentication with fewer lines on other files.
// Component.auth [true,false] - Verifies AUTH (user is logged in)
// Component.admin [true, false] - Verifies ADMIN (User is owner of the site)

const RequireRole = ({ role, children }) => {
	const { data: session, status } = useSession({ required: true });
	const isRole = !!session?.user?.roles?.includes(role);
	//console.log(isRole);
	if (isRole) {
		return children;
	}
	return <div>Loading...</div>;
};

function Auth({ children }) {
	const { data: session, status } = useSession({ required: true });

	if (isAuth(session)) {
		return children;
	}
	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div></div>;
}
function Admin({ children }) {
	const { data: session, status } = useSession({ required: true });
	if (isAdmin(session)) {
		return children;
	}

	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <div></div>;
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

export default App;
