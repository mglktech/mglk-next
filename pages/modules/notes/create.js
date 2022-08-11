import { DefaultLayout } from '../../../layouts/DefaultLayout';
import { ComingSoon } from '../../../components/base';
import { MDEditor, MDPreview } from '../../../components/MDEditor';
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
const Page = () => {
	return (
		<DefaultLayout>
			<div className="pt-20" />
			<Container>
				<MDEditor />
			</Container>
		</DefaultLayout>
	);
};
export default Page;
