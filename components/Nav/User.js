import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Header, Image, Label, Icon } from 'semantic-ui-react';
import { useRouter } from 'next/router';
export default function Component() {
	const { data: session } = useSession();
	const router = useRouter();
	if (session) {
		//console.log(session);
		return (
			<div className="content-center">
				{session.user.owner ? (
					<>
						<Button icon color="teal" onClick={() => router.push('/admin')}>
							<Icon name="shield" />
						</Button>
					</>
				) : (
					<></>
				)}

				<Label
					as="a"
					image
					color="violet"
					size="big"
					onClick={() => router.push('/account')}
				>
					<Image
						avatar
						alt="profile avatar"
						spaced="right"
						src={session.user.image_url}
					/>
					{session.user.username}
					<Label.Detail>#{session.user.discriminator}</Label.Detail>
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
