import { useSession, signIn, signOut } from 'next-auth/react';
import {
	Button,
	Header,
	Image,
	Label,
	Icon,
	Dropdown,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
export default function Component() {
	const { data: session } = useSession();
	const router = useRouter();
	if (session) {
		//console.log(session);
		return (
			<>
				<div className="content-center">
					{session.user.owner ? (
						<>
							<Button
								compact
								icon
								color="teal"
								onClick={() => router.push('/admin')}
							>
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
						compact
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
						<Dropdown floating>
							<Dropdown.Menu>
								<Dropdown.Item text="New" />
								<Dropdown.Item text="Open..." description="ctrl + o" />
								<Dropdown.Item text="Save as..." description="ctrl + s" />
								<Dropdown.Item text="Rename" description="ctrl + r" />
								<Dropdown.Item text="Make a copy" />
								<Dropdown.Item icon="folder" text="Move to folder" />
								<Dropdown.Item icon="trash" text="Move to trash" />
								<Dropdown.Divider />
								<Dropdown.Item text="Download As..." />
								<Dropdown.Item text="Publish To Web" />
								<Dropdown.Item text="E-mail Collaborators" />
							</Dropdown.Menu>
						</Dropdown>
					</Label>

					<Button
						className=""
						compact
						color="purple"
						content="Sign Out"
						icon="sign-in"
						labelPosition="right"
						onClick={() => signOut()}
					/>
				</div>
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
