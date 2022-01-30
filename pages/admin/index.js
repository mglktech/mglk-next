import Layout from '../../layouts/Default';
import {
	Container,
	Header,
	Button,
	Icon,
	Label,
	Image,
} from 'semantic-ui-react';
// import { useRouter } from 'next/router';
// import { useSession, getSession } from 'next-auth/react';
import {
	RouteTesting,
	GuildComponent,
	// DemoComponent,
} from '../../components/admin';
import { DiscordBot } from '../../components/admin/DiscordBot';
// import dbConnect from '../../lib/dbConnect';
// import Bots from '../../models/Bot';
//import { bot_findMe } from '../../utils/discord';
//import { findGuilds } from '../../utils/discord';
const Page = () => {
	// const router = useRouter();
	//const botProps = JSON.parse(props.botProps);
	return (
		<>
			<Layout>
				<Container className="flex space-y-5">
					<Header as="h2">Admin Route</Header>
					{/* <RouteTesting /> */}
					{/* <GuildComponent botProps={props.botProps} /> */}
					{/* <DemoComponent /> */}
					<DiscordBot />
					{/* <Button
						basic
						icon
						color="violet"
						onClick={() => router.push('/admin/setup')}
					>
						Perform Setup
						<Icon name="code branch" />
					</Button> */}
				</Container>
			</Layout>
		</>
	);
};
// export async function getServerSideProps() {
// 	await dbConnect();
// 	const client_id = process.env.DISCORD_CLIENT_ID;
// 	const guild_id = process.env.DISCORD_SERVER_ID;
// 	const redir_uri = 'http://localhost:3000/api/bot';
// 	const bot = await Bots.findOne({ client_id });
// 	//console.log(bot);
// 	let botGuilds = false;
// 	if (bot) {
// 		botGuilds = false; //await bot_findGuilds();
// 	}
// 	let props = {
// 		botProps: {
// 			client_id,
// 			guild_id,
// 			redir_uri,
// 			bot: JSON.stringify(bot),
// 			botGuilds,
// 		},
// 	};
// 	//console.log('Initial props');
// 	return {
// 		props,
// 	};
// }
Page.auth = true;
Page.admin = true;
export default Page;
