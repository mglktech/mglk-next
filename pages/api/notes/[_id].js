import Notes from '../../../models/notes_model';
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

	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				if (_id == 'new') {
					res.status(200).json({ title: '', contents: '' });
					return;
				}
				console.log(`/api/notes/${_id}:: GET ::`);
				const noteData = await Notes.findOne({ _id, author: user._id }).lean();
				res.status(200).json(noteData);
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
				const resp = await Notes.findOneAndUpdate(
					{ _id, author: user._id },
					body
				);
				res.status(200).json(resp);
				//console.log(result);
				return;
			} catch (error) {
				handleError(error);
			}
		case 'DELETE':
			try {
				console.log(`/api/notes/${_id}:: DELETE ::`);
				const data = await Notes.findOneAndDelete({
					_id,
					author: user._id,
				}).exec();
				res.status(200).json(data);
				return;
			} catch (error) {
				handleError(error);
			}
		default:
			res.status(500).json('Internal Server Error (500)');
			return;
	}
};

export default index;
