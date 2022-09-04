import { DefaultLayout } from '../../../../layouts/DefaultLayout';
import { NoteView } from '../../../../components/NoteComponents';
const view = ({ _id }) => {
	return (
		<DefaultLayout>
			<NoteView _id={_id} />
		</DefaultLayout>
	);
};
export async function getServerSideProps(ctx) {
	const _id = ctx?.query?._id;
	return {
		props: { _id },
	};
}

export default view;
