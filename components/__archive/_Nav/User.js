import { useSession, signIn, signOut } from 'next-auth/react';
import {
	Button,
	Header,
	Image,
	Label,
	Icon,
	Dropdown,
	Menu,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { isRole } from '../../../lib/auth';
export default function Component({ fixed, mobile }) {
	const { data: session } = useSession();
	const router = useRouter();

	if (mobile) {
		return (
			<Image
				avatar
				alt="profile avatar"
				spaced="right"
				src={session?.user.image_url}
			/>
		);
	}
	if (session) {
		//console.log(session);
		return (
			<div className="content-center">
				<Label
					className=""
					as="a"
					image
					size="large"
					color="violet"
					// onClick={() => router.push('/account')}
				>
					<Image
						avatar
						alt="profile avatar"
						spaced="right"
						src={session.user.image_url}
					/>
					{session.user.username}
					<Label.Detail>#{session.user.discriminator}</Label.Detail>
					<Dropdown>
						<Dropdown.Menu direction="left">
							{isRole(session, 'Owner') ? (
								<>
									<Dropdown.Header color="teal" icon="shield" content="Admin" />
									<Dropdown.Divider />
									<Dropdown.Item
										text="Admin Menu"
										description=""
										onClick={() => router.push('/admin')}
									/>
								</>
							) : (
								<></>
							)}
							<Dropdown.Header icon="user" content="Account" />
							<Dropdown.Divider />
							<Dropdown.Item
								text="Profile"
								description=""
								onClick={() => router.push('/account')}
							/>
							<Dropdown.Header icon="book" content="Modules" />
							<Dropdown.Divider />
							<Dropdown.Item text="Articles" description="" />
							<Dropdown.Divider />
							<Dropdown.Item>
								<Button
									className=""
									compact
									color="purple"
									content="Sign Out"
									icon="sign-in"
									labelPosition="right"
									onClick={() => signOut()}
								/>
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Label>
			</div>
		);
	}
	return (
		<>
			<Button
				basic={!fixed}
				color="purple"
				content="Sign In"
				icon="sign-in"
				labelPosition="right"
				onClick={() => signIn()}
			/>
		</>
	);
}
