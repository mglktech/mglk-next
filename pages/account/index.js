import Layout from '../../layouts/Default';
import { useSession } from 'next-auth/react';
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
} from 'semantic-ui-react';
import ListItem from '../../components/account/IndexListItem';
const Page = () => {
	const { data: session } = useSession();
	return (
		<>
			<Layout>
				<Container className="p-3 border-indigo-500 border bg-gray-100">
					<div>
						<Header as="h2">
							<Icon name="settings" />
							<Header.Content>
								Account Settings
								<Header.Subheader>Manage your preferences</Header.Subheader>
							</Header.Content>
						</Header>
					</div>
					<List divided selection>
						<ListItem
							lblKey={session?.user?.username}
							lblValue={`#${session?.user?.discriminator}`}
						/>
						<ListItem lblKey="_id" lblValue={session?.user.id} />
						<ListItem
							lblKey="discord_id"
							lblValue={session?.user?.discord_id}
						/>
						<ListItem lblKey="avatar" lblValue={session?.user?.avatar} />
						<ListItem
							lblKey="accent_color"
							lblValue={session?.user?.accent_color}
						/>
						<ListItem
							lblKey="banner_color"
							lblValue={session?.user?.banner_color}
						/>
						<ListItem lblKey="image_url" lblValue={session?.user?.image_url} />
						<ListItem lblKey="avatar" lblValue={session?.user?.avatar} />
					</List>
				</Container>
			</Layout>
		</>
	);
};
// export async function getServerSideProps(ctx) {
// 	const session = await getSession(ctx);
// 	//console.log(session);
// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/accessDenied',
// 				permanent: false,
// 			},
// 		};
// 	}
// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }
export default Page;
Page.isAuth = true;
