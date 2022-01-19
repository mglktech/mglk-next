import Layout from '../../layouts/Default';
import {
	Container,
	Header,
	Button,
	Icon,
	Label,
	Image,
} from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
//import Account from '../../models/Account';
// import discordClient from '../../utils/discordClient';
// const DiscordClient = discordClient();
const Page = () => {
	const router = useRouter();
	//const { data: session } = useSession();
	//const guilds = session.user.guilds;
	return (
		<Layout>
			<Container className="flex">
				<Header as="h2">Admin Route</Header>
				<Button
					basic
					icon
					color="violet"
					onClick={() => router.push('/admin/setup')}
				>
					Perform Setup
					<Icon name="code branch" />
				</Button>
				<Label>
					Dogs
					<Label.Detail>214</Label.Detail>
				</Label>
			</Container>
		</Layout>
	);
};

// export async function getServerSideProps(ctx) {
// 	const session = await getSession(ctx);
// 	console.log(session);

// 	return {
// 		props: {
// 			// guilds,
// 		},
// 	};
// }
Page.auth = true;
Page.admin = true;
export default Page;
