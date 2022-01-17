import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Header, Image, Label } from 'semantic-ui-react';

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		//console.log(session);
		return (
			<div className="content-center">
				<Label as="a" image color="violet" size="medium">
					<Image
						avatar
						alt="profile avatar"
						spaced="right"
						src={session.user.image}
					/>
					{session.user.name}
					<Label.Detail>#{session.user.discord.discriminator}</Label.Detail>
				</Label>

				<Button
					className=""
					color="purple"
					content="Sign Out"
					icon="sign-in"
					labelPosition="right"
					onClick={() => signOut()}
				/>
			</div>
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
