/*
ON EVERY REQUEST
ensure user is signed in AND has the correct permissions (admin)

on GET
get all notes

on POST
create a new note

on PUT
update a note

on DELETE
delete a note

Note Object ID can be used in this instance as advanced permissions are required
*/

import Notes from '../../../models/Notes';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
const index = async (req, res) => {
	const { method, body } = req;

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
	if (user.userType !== 'admin') {
		handleError('User is not an admin');
	}
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const noteData = await Notes.find({ archived: true })
					.sort({ createdAt: -1 })
					.lean();
				res.status(200).json({ success: true, data: noteData });
				return;
			} catch (error) {
				handleError(error);
			}
		case 'POST':
			try {
				let noteData;
				if (body.count) {
					noteData = await Notes.countDocuments({ archived: true }).exec();
				}
				if (body.find) {
					noteData = await Notes.find({ archived: true })
						.sort({ createdAt: -1 })
						.lean();
				}

				res.status(200).json({ success: true, data: noteData });
				return;
			} catch (error) {
				handleError(error);
			}
		case 'PUT':
			handleError('PUT not allowed');
		case 'DELETE':
			handleError('DELETE not allowed');
		default:
			res
				.status(500)
				.json({ success: false, message: 'Internal Server Error (500)' });
			return;
	}
};

export default index;
