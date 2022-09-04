import { DefaultLayout } from '../../../layouts/DefaultLayout';
import { NewNote } from '../../../components/NoteComponents';

const Page = () => {
	return (
		<>
			<DefaultLayout>
				<div className="pt-10" />
				<NewNote />
			</DefaultLayout>
		</>
	);
};

export default Page;
