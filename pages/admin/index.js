import Layout from '../../layouts/Default';
import { Container } from 'semantic-ui-react';

import { DiscordBot } from '../../components/admin/DiscordBot';
import ModuleEditor from '../../components/admin/ModuleEditor';
import NodeModules from '../../components/admin/NodeModules';

const Page = () => {
	return (
		<>
			<Layout>
				<Container className="flex space-y-5">
					<DiscordBot />
					<NodeModules />
					<ModuleEditor />
				</Container>
			</Layout>
		</>
	);
};

Page.auth = true;
Page.admin = true;
export default Page;
