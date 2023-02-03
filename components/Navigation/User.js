import { useSession, signIn, signOut } from 'next-auth/react';
import {
	Button,
	Header,
	Image,
	Label,
	Icon,
	Dropdown,
	Menu,
	Segment,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { isAdmin } from '../../lib/auth';
//import { Component } from 'react/cjs/react.production.min';

export const User = ({ fixed, mobile }) => {
	const { data: session, status } = useSession();
	//console.log('session', session);
	const router = useRouter();
	switch (status) {
		case 'loading':
			return (
				<>
					<Button loading basic={!fixed} />
				</>
			);
		case 'unauthenticated':
			return (
				<Button basic inverted>
					<Dropdown text="Sign In / Sign Up">
						<Dropdown.Menu direction="left">
							<Dropdown.Header>Account Management</Dropdown.Header>
							<Menu.Item onClick={() => signIn()}>
								<Button
									content="Sign In"
									color="teal"
									icon="right arrow"
									labelPosition="right"
								/>
							</Menu.Item>

							<Menu.Item onClick={() => router.push('/account/create')}>
								<Header as="h6">{"Don't have an account yet?"}</Header>
								<Button
									content="Join Us"
									basic
									color="violet"
									icon="right arrow"
									labelPosition="right"
								/>
							</Menu.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Button>
			);
		case 'authenticated':
			return (
				<Dropdown
					icon="caret right"
					inline
					trigger={
						<div className="inline-flex items-center space-x-2 pr-2 ">
							<div
								style={{
									background: `url('${session?.user?.avatar}') center / cover no-repeat`,
									height: '30px',
									aspectRatio: '1/1',
								}}
							/>
							{mobile ? (
								<>
									<Icon name="user" />
								</>
							) : (
								<>
									<span className="font-bold tracking-wide">
										{session?.user?.email}
									</span>
								</>
							)}
						</div>
					}
					className="bg-purple-700 rounded mr-5"
				>
					<Dropdown.Menu direction="left">
						{isAdmin(session) ? (
							<>
								<Dropdown.Header icon="shield" content="Admin" />
								<Dropdown.Item
									text="Dashboard"
									description=""
									onClick={() => router.push('/admin')}
								/>
							</>
						) : (
							<></>
						)}
						<Dropdown.Divider />
						<Dropdown.Header icon="user" content="Account" />
						<Dropdown.Item
							text="Profile"
							description=""
							onClick={() => router.push('/account')}
						/>

						<Dropdown.Divider />
						<Dropdown.Header icon="book" content="Modules" />
						<Dropdown.Item
							text="Notes"
							onClick={() => router.push('/account/notes')}
						/>

						<Dropdown.Divider />
						<Dropdown.Item>
							<Button
								className=""
								compact
								color="purple"
								content="Sign Out"
								icon="sign-in"
								labelPosition="right"
								onClick={() => router.push('/account/signout')}
							/>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			);
	}
};

function _Component({ fixed, mobile }) {
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
		console.log('session', session);
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
						src={session.user?.image_url}
					/>
					{session.user?.username}
					<Label.Detail>#{session.user?.discriminator}</Label.Detail>
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
