import { DefaultLayout } from '../../../layouts/DefaultLayout';
import { NoteEditorView } from '../../../components/NoteComponents';

const Page = () => {
	return (
		<>
			<DefaultLayout>
				<NoteEditorView />
			</DefaultLayout>
		</>
	);
};

export default Page;
