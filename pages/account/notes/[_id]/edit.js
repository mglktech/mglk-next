import React from 'react';
import { DefaultLayout } from '../../../../layouts/DefaultLayout';
import { NoteEditorView } from '../../../../components/NoteComponents';
const edit = ({ _id, data }) => {
	return (
		<DefaultLayout>
			<NoteEditorView _id={_id} />
		</DefaultLayout>
	);
};

export async function getServerSideProps(ctx) {
	const _id = ctx?.query?._id;
	return {
		props: { _id },
	};
}

export default edit;
