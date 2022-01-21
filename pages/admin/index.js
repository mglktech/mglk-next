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
import { RouteTesting, GuildComponent } from '../../components/admin';
import dbConnect from '../../lib/dbConnect';
import Bots from '../../models/Bot';
//import { bot_findMe, bot_findGuilds } from '../../utils/discord';
//import { findGuilds } from '../../utils/discord';
const Page = (props) => {
	const router = useRouter();
	return (
		<>
			<Layout>
				<Container className="flex space-y-5">
					<Header as="h2">Admin Route</Header>
					<RouteTesting />
					<GuildComponent botProps={props.botProps} />
					<Button
						basic
						icon
						color="violet"
						onClick={() => router.push('/admin/setup')}
					>
						Perform Setup
						<Icon name="code branch" />
					</Button>
				</Container>
			</Layout>
		</>
	);
};
export async function getServerSideProps() {
	await dbConnect();
	const client_id = process.env.DISCORD_CLIENT_ID;
	const guild_id = process.env.DISCORD_SERVER_ID;
	const redir_uri = 'http://localhost:3000/api/bot';
	const bot = await Bots.findOne({ client_id });
	console.log(bot);
	let botGuilds = false;
	if (bot) {
		botGuilds = false; //await bot_findGuilds();
	}
	let props = {
		botProps: {
			client_id,
			guild_id,
			redir_uri,
			bot: JSON.stringify(bot),
			botGuilds,
		},
	};
	//console.log('Initial props');
	return {
		props,
	};
}
Page.auth = true;
Page.admin = true;
export default Page;
