import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Container } from 'semantic-ui-react';

import { DiscordBot } from '../../components/admin/DiscordBot';
import { ProjectEditor } from '../../components/admin/projects';
import NodeModules from '../../components/admin/NodeModules';
import PhotoManager from '../../components/admin/PhotoManager';

const Page = () => {
	return (
		<>
			<DefaultLayout>
				<Container className="flex space-y-5">
					<ProjectEditor />
					{/* <DiscordBot /> */}
					<NodeModules />
					<PhotoManager />
				</Container>
			</DefaultLayout>
		</>
	);
};

Page.requireRole = 'Owner';
export default Page;
