//import '../styles/globals.css'
import '/styles/github-markdown.css';
import 'semantic-ui-css/semantic.min.css';
import { SessionProvider } from 'next-auth/react';
function MyApp({ session, Component, pageProps }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
