import { DefaultLayout as Layout } from '../../layouts/DefaultLayout';
import { getSession } from 'next-auth/react';
import { HeaderIconSub, InputInitiallyHidden } from '../../components/base';
import { FormHeader } from '../../components/forms/FormComponents';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
	Header,
	Textbox,
	Button,
	Card,
	Container,
	Image,
	Icon,
	Grid,
	Rail,
	Segment,
	List,
	Label,
	Input,
	Form,
	Placeholder,
	Table,
	Dropdown,
	Select,
} from 'semantic-ui-react';
import ListItem from '../../components/account/IndexListItem';
import { UserInformation, AccountCard } from '../../components/account';

const Page = () => {
	const [user, setUser] = useState({});
	//const [form, setForm] = useState({});
	const fetchData = async () => {
		const res = await fetch(`/api/users/me`);
		const { data: user } = await res.json();
		setUser(user);
	};
	useEffect(() => {
		fetchData();
	}, []);
	const handleChange = async (params) => {
		//e.preventDefault();
		const res = await fetch(`/api/users/me`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
		const { data: user } = await res.json();
		setUser(user);
	};

	return (
		<>
			<Layout>
				<Container className="pt-10">
					<Segment>
						<FormHeader
							divider
							icon="user"
							content="Account"
							sub="Manage your account"
						/>
						<Segment basic>
							<Header>Account Details</Header>
							<Grid divided stackable>
								<Grid.Row columns={2}>
									<Grid.Column width={4} className="space-y-2">
										<AccountCard user={user} />
									</Grid.Column>
									<Grid.Column width={12}>
										<UserInformation user={user} handleChange={handleChange} />
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					</Segment>
				</Container>
			</Layout>
		</>
	);
};

// export async function getServerSideProps(context) {
// 	// Fetch data from external API
// 	const session = await getSession({ req: context.req });
// 	if (!session?.user) {
// 		return {
// 			redirect: {
// 				destination: '/account/signin',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	//const userInfo = await getUser(session.user.uuid);
// 	//console.log('userInfo', userInfo);
// 	return { props: { uuid: session.user.uuid } };
// }

// // OLD CODE
// const _Page = () => {
// 	const { data: session } = useSession();
// 	return (
// 		<>
// 			<Layout>
// 				<HeaderIconSub
// 					content="Account"
// 					icon="settings"
// 					sub="For all your account needs"
// 				/>
// 				<Container className="p-3 border-indigo-500 border bg-gray-100">
// 					<div>
// 						<Header as="h2">
// 							<Icon name="settings" />
// 							<Header.Content>
// 								Account Settings
// 								<Header.Subheader>Manage your preferences</Header.Subheader>
// 							</Header.Content>
// 						</Header>
// 					</div>
// 					<List divided selection>
// 						<ListItem
// 							lblKey={session?.user?.username}
// 							lblValue={`#${session?.user?.discriminator}`}
// 						/>
// 						<ListItem lblKey="_id" lblValue={session?.user.id} />
// 						<ListItem
// 							lblKey="discord_id"
// 							lblValue={session?.user?.discord_id}
// 						/>
// 						<ListItem lblKey="avatar" lblValue={session?.user?.avatar} />
// 						<ListItem
// 							lblKey="accent_color"
// 							lblValue={session?.user?.accent_color}
// 						/>
// 						<ListItem
// 							lblKey="banner_color"
// 							lblValue={session?.user?.banner_color}
// 						/>
// 						<ListItem lblKey="image_url" lblValue={session?.user?.image_url} />
// 						<ListItem lblKey="avatar" lblValue={session?.user?.avatar} />
// 					</List>
// 				</Container>
// 			</Layout>
// 		</>
// 	);
// };

Page.auth = true;
export default Page;
