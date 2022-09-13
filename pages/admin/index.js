import { DefaultLayout } from '../../layouts/DefaultLayout';

import ValheimConfigEditor from '../../components/ValheimConfigEditor';

const Page = ({ ctx }) => {
	return (
		<>
			<DefaultLayout>
				<div className="pt-10" />
				{/* <Container className="flex space-y-5">
					<ProjectEditor />
					
					<NodeModules />
					<PhotoManager />
				</Container> */}
				{/* <QuickLinks /> */}
				{/* <AdminComponent ctx={ctx} /> */}
				<ValheimConfigEditor />
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
Page.auth = true;
Page.admin = true;
export default Page;
