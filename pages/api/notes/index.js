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

import Notes from '../../../models/notes_model';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
const index = async (req, res) => {
	const { method, body } = req;

	const handleError = (err) => {
		res.status(422).json(error);
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
	const { _id } = user;
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const noteData = await Notes.find({ archived: false, author: _id })
					.sort({ createdAt: -1 })
					.lean();
				res.status(200).json(noteData);
				return;
			} catch (error) {
				handleError(error);
			}
		case 'POST':
			try {
				const note = { ...body, author: user._id };
				console.log('/api/notes/:: POST ::', note);
				const newNote = await new Notes(note).save();
				res.status(201).json(newNote);
				//console.log(result);
				return;
			} catch (error) {
				handleError(error);
			}
		// case 'PUT':
		// 	try {
		// 		const { _id } = body;
		// 		console.log('/api/notes/[body]:: PUT ::', body);
		// 		await Notes.findOneAndUpdate({ _id }, body);
		// 		res.status(200).json({ success: true, _id });
		// 		//console.log(result);
		// 		return;
		// 	} catch (error) {
		// 		handleError(error);
		// 	}
		case 'DELETE':
			try {
				const { _id } = body;
				console.log('/api/notes/[body]:: DELETE ::', body);
				await Notes.findOneAndDelete({ _id, author: user._id });
				res.status(200);
				//console.log(result);
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
