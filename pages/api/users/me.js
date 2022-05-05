import React from 'react';
import Users from '../../../models/User';
import dbConnect from '../../../lib/dbConnect';
import { getSession } from 'next-auth/react';
const index = async (req, res) => {
	const { method } = req;

	const handleError = (err) => {
		res.status(422).json({ success: false, message: err });
		return;
	};

	const session = await getSession({ req }); // Obtains session data from NextAuth, so that only the user's own data is configured.
	if (!session) {
		res.status(400).json({ success: false, message: 'No session found' });
		return;
	}
	const { user } = session;
	if (!user) {
		res.status(400).json({ success: false, message: 'No user found' });
		return;
	}
	await dbConnect();
	switch (method) {
		case 'GET':
			try {
				const userData = await Users.findOne(
					{ uuid: user.uuid },
					{ password: 0, _id: 0 }
				).lean();
				res.status(200).json({ success: true, data: userData });
				return;
			} catch (error) {
				handleError(error);
			}
		case 'POST':
			try {
				const body = filterBody(req.body);
				//console.log('body', body);

				const result = await Users.findOneAndUpdate({ uuid: user.uuid }, body, {
					new: true,
				});
				// res.status(201).json(updatedDocument);
				//console.log(result);
				res.status(200).json({ success: true, data: result });
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

// Thanks to https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
const filterBody = (raw) => {
	const notAllowed = [
		'uuid',
		'email',
		'password',
		'__v',
		'createdAt',
		'updatedAt',
	];
	const filtered = Object.keys(raw)
		.filter((key) => !notAllowed.includes(key))
		.reduce((obj, key) => {
			obj[key] = raw[key];
			return obj;
		}, {});
	return filtered;
};

const fetchUser = async (uuid) => {
	await dbConnect();
	return await Users.findOne({ uuid }, { password: 0, _id: 0 }).lean();
};

export default index;
