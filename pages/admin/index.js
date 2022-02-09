import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Container } from 'semantic-ui-react';

import { DiscordBot } from '../../components/admin/DiscordBot';
import ModuleEditor from '../../components/admin/ModuleEditor';
import NodeModules from '../../components/admin/NodeModules';

const Page = () => {
	return (
		<>
			<DefaultLayout>
				<Container className="flex space-y-5">
					<DiscordBot />
					<NodeModules />
					<ModuleEditor />
				</Container>
			</DefaultLayout>
		</>
	);
};

Page.auth = true;
Page.admin = true;
export default Page;
