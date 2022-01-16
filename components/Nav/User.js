import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from 'semantic-ui-react';
export default function Component() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<Button
				basic
				color="purple"
				content="Sign In"
				icon="sign-in"
				labelPosition="right"
				onClick={() => signIn()}
			/>
		</>
	);
}
