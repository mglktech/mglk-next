import { DefaultLayout } from '../../layouts/DefaultLayout';
import { Container } from 'semantic-ui-react';

import { DiscordBot } from '../../components/admin/DiscordBot';
import { ProjectEditor } from '../../components/admin/projects';
import NodeModules from '../../components/admin/NodeModules';
import PhotoManager from '../../components/admin/PhotoManager';

import { AdminComponent } from '../../components/admin';

const Page = ({ ctx }) => {
	return (
		<>
			<DefaultLayout>
				{/* <Container className="flex space-y-5">
					<ProjectEditor />
					
					<NodeModules />
					<PhotoManager />
				</Container> */}
				<AdminComponent ctx={ctx} />
			</DefaultLayout>
		</>
	);
};
export const getServerSideProps = (context) => {
	const ctx = context?.query?.initctx ? context?.query?.initctx : null;
	return {
		props: { ctx },
	};
};

Page.requireRole = 'Owner';
export default Page;
