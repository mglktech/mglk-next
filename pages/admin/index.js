import { DefaultLayout } from '../../layouts/DefaultLayout';

import ValheimConfigEditor from '../../components/ValheimConfigEditor';
import Dashboard from '../../components/admin/dashboard';
import {
	Form,
	Checkbox,
	Button,
	Label,
	Icon,
	Container,
	Segment,
	Grid,
	Header,
	Menu,
	Placeholder,
	Modal,
	Input,
	Divider,
	TextArea,
} from 'semantic-ui-react';
const Page = ({ ctx }) => {
	return (
		<>
			<DefaultLayout>
				<div className="pt-10" />
				<div className="flex justify-center">
					<Dashboard />
				</div>
				{/* <Container className="flex space-y-5">
					<ProjectEditor />
					
					<NodeModules />
					<PhotoManager />
				</Container> */}
				{/* <QuickLinks /> */}
				{/* <AdminComponent ctx={ctx} /> */}
				{/* <ValheimConfigEditor /> */}
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
