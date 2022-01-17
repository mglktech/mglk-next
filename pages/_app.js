//import '../styles/globals.css'
import '/styles/github-markdown.css';
import 'semantic-ui-css/semantic.min.css';
import { SessionProvider, useSession } from 'next-auth/react';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			{Component.auth ? (
				<Auth>
					<Component {...pageProps} />
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

export default MyApp;
