import Notes from '../../../models/Notes';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
const index = async (req, res) => {
	const {
		query: { _id },
		method,
		body,
	} = req;

	const handleError = (err) => {
		res.status(422).json({ success: false, message: err });
		return;
	};

	const session = await getSession({ req }); // Obtains session data from NextAuth, so that only the user's own data is configured.
	if (!session) {
		handleError('No session found');
	}
	const { user } = session;
	if (!user) {
		handleError('No user found');
	}
	if (!user.userType === 'admin') {
		handleError('User is not an admin');
	}
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				console.log(`/api/notes/${_id}:: GET ::`);
				const noteData = await Notes.findById(_id).lean();
				res.status(200).json({ success: true, data: noteData });
				return;
			} catch (error) {
				handleError(error);
			}
		case 'POST':
			try {
				res.status(404);
				return;
			} catch (error) {
				handleError(error);
			}
		case 'PUT':
			try {
				console.log(`/api/notes/${_id}:: PUT ::`, body);
				await Notes.findOneAndUpdate({ _id }, body);
				res.status(200).json({ success: true });
				//console.log(result);
				return;
			} catch (error) {
				handleError(error);
			}
		case 'DELETE':
			try {
				console.log(`/api/notes/${_id}:: DELETE ::`);
				const data = await Notes.findOneAndDelete({ _id }).exec();
				res.status(200).json({ success: true, data });
				return;
			} catch (error) {
				handleError(error);
			}
		default:
			res
				.status(500)
				.json({ success: false, message: 'Internal Server Error (500)' });
			return;
	}
};

export default index;
